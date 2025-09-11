import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeadsComponent } from './view-leads.component';

describe('ViewLeadsComponent', () => {
  let component: ViewLeadsComponent;
  let fixture: ComponentFixture<ViewLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
