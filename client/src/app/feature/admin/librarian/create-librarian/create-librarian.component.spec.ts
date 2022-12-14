import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLibrarianComponent } from './create-librarian.component';

describe('CreateLibrarianComponent', () => {
  let component: CreateLibrarianComponent;
  let fixture: ComponentFixture<CreateLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
