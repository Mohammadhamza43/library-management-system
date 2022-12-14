import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibrarianComponent } from './list-librarian.component';

describe('ListLibrarianComponent', () => {
  let component: ListLibrarianComponent;
  let fixture: ComponentFixture<ListLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
