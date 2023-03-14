import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerFormComponent } from './hacker-form.component';

describe('HackerFormComponent', () => {
  let component: HackerFormComponent;
  let fixture: ComponentFixture<HackerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HackerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
