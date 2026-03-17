import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMyProfileComponent } from './form-my-profile.component';

describe('FormMyProfileComponent', () => {
  let component: FormMyProfileComponent;
  let fixture: ComponentFixture<FormMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
