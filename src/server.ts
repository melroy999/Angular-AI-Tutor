import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const API_URL = 'http://localhost:3000';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

async function requireAuth(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/auth`);
    const auth = await response.json() as { loggedIn: boolean };
    if (auth.loggedIn) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch {
    res.status(500).send('Auth check failed');
  }
}

async function proxy(req: import('express').Request, res: import('express').Response): Promise<void> {
  const targetPath = req.originalUrl.replace(/^\/api/, '');
  const response = await fetch(`${API_URL}${targetPath}`, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: ['POST', 'PATCH', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : undefined,
  });
  const data = await response.json();
  res.status(response.status).json(data);
}

app.get('/api/{*splat}', proxy);
app.patch('/api/auth', proxy);
app.post('/api/{*splat}', requireAuth, proxy);
app.patch('/api/{*splat}', requireAuth, proxy);
app.delete('/api/{*splat}', requireAuth, proxy);

app.get('/recipes/new', requireAuth);
app.get('/recipes/new_signal', requireAuth);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
