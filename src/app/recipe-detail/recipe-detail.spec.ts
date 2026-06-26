import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetail } from './recipe-detail';
  import { commonTestProviders } from '../testing/test-providers';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('RecipeDetail', () => {
  let component: RecipeDetail;
  let fixture: ComponentFixture<RecipeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
      providers: [
        ...commonTestProviders
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
