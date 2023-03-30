import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetforumComponent } from './viewforum.component';

describe('GetforumComponent', () => {
  let component: GetforumComponent;
  let fixture: ComponentFixture<GetforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetforumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
