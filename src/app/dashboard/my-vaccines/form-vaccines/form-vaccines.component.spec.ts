import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVaccinesComponent } from './form-vaccines.component';

describe('FormVaccinesComponent', () => {
  let component: FormVaccinesComponent;
  let fixture: ComponentFixture<FormVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVaccinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
