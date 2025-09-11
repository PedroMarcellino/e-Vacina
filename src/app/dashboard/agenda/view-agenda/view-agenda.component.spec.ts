import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgendaComponent } from './view-agenda.component';

describe('ViewAgendaComponent', () => {
  let component: ViewAgendaComponent;
  let fixture: ComponentFixture<ViewAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
