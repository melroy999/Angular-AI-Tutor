import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeList } from './recipe-list';
import { commonTestProviders, recipeMockProvider } from '../testing/test-providers';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecipeList', () => {
  let component: RecipeList;
  let fixture: ComponentFixture<RecipeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
      providers: [
        ...commonTestProviders,
        ...recipeMockProvider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
