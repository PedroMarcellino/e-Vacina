import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFamilyComponent } from './view-family.component';

describe('ViewFamilyComponent', () => {
  let component: ViewFamilyComponent;
  let fixture: ComponentFixture<ViewFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFamilyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
