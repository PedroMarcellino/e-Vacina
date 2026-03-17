import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaccinesComponent } from './view-vaccines.component';

describe('ViewVaccinesComponent', () => {
  let component: ViewVaccinesComponent;
  let fixture: ComponentFixture<ViewVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVaccinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
