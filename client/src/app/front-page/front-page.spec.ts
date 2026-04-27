import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPage } from './front-page';

describe('FrontPage', () => {
  let component: FrontPage;
  let fixture: ComponentFixture<FrontPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
