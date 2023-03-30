import { ComponentFixture, TestBed } from '@angular/core/testing';

import { viewforumComponent } from './viewforum.component';

describe('GetforumComponent', () => {
  let component: viewforumComponent;
  let fixture: ComponentFixture<viewforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ viewforumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(viewforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
