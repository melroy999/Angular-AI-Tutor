import { TestBed } from '@angular/core/testing';

import { Recipe } from './recipe';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { MOCK_RECIPES } from './mock-recipes';

describe('Recipe', () => {
  let service: Recipe;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute, useValue: {
            snapshot: { params: { id: '1' }, data: { recipes: [] } }
          }
        },
      ]
    });

    service = TestBed.inject(Recipe);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('`fetchAll()` should GET /recipes', () => {
    service.fetchAll().subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/recipes`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RECIPES);
  });

  it('`searchRecipes()` should GET /recipes with the search term as a query parameter', () => {
    const searchTerm = "search";
    service.searchRecipes(searchTerm).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/recipes?name:contains=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_RECIPES);
  });

  it('`addRecipe()` should POST the recipe to /recipes', () => {
    const recipe = {
      id: '',
      authorEmail: '',
      description: '',
      imgUrl: '',
      ingredients: [],
      isFavorite: false,
      name: ''
    }
    const mockResponse = { ...recipe, id: "1" };

    service.addRecipe(recipe).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/recipes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(recipe);
    req.flush(mockResponse);
  });
});
