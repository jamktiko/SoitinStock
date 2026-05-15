import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontPage } from './front-page';

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
});

// TESTING CHANGES for Activated Route and MatDialogRef errors
