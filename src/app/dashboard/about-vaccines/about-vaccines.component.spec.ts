import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVaccinesComponent } from './about-vaccines.component';

describe('AboutVaccinesComponent', () => {
  let component: AboutVaccinesComponent;
  let fixture: ComponentFixture<AboutVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutVaccinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
