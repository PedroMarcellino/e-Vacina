import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLeadsComponent } from './form-leads.component';

describe('FormLeadsComponent', () => {
  let component: FormLeadsComponent;
  let fixture: ComponentFixture<FormLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
