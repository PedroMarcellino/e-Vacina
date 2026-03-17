import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVaccinesComponent } from './my-vaccines.component';

describe('MyVaccinesComponent', () => {
  let component: MyVaccinesComponent;
  let fixture: ComponentFixture<MyVaccinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyVaccinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyVaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
