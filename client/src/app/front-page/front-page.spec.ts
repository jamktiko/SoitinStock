import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontPage } from './front-page';

// testing dependencies
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { convertToParamMap } from '@angular/router';

describe('FrontPage', () => {
  let component: FrontPage;
  let fixture: ComponentFixture<FrontPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontPage],
      // testing providers with mock values
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ category: 'guitar' })),
          },
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // CUSTOM TESTS:

  // tests that the displayCategory method correctly formats the category name
  it('should display category correctly', () => {
    expect(component.displayCategory('guitar')).toBe('Guitars');
  });

  // tests that unknown categories return the original value
  it('should return original category if no mapping exists', () => {
    expect(component.displayCategory('banjo')).toBe('banjo');
  });

  // tests that null category returns empty string
  it('should return empty string for null category', () => {
    expect(component.displayCategory(null)).toBe('');
  });
});
