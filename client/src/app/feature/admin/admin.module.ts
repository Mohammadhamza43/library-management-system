import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListStudentComponent } from './student/list-student/list-student.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { CreateLibrarianComponent } from './librarian/create-librarian/create-librarian.component';
import { ListLibrarianComponent } from './librarian/list-librarian/list-librarian.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BorrowBookComponent } from './book/borrow-book/borrow-book.component';
import { BorrowedBookComponent } from './book/borrowed-book/borrowed-book.component';
import { BookRequestComponent } from './book/book-request/book-request.component';
import {SharedModule} from "../../shared/shared.module";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'student',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/app/admin/student/list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListStudentComponent
          },
          {
            path: 'create',
            component: CreateStudentComponent
          },
          {
            path: 'edit/:id',
            component: CreateStudentComponent
          },
        ]
      },
      {
        path: 'librarian',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/app/admin/librarian/list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListLibrarianComponent
          },
          {
            path: 'create',
            component: CreateLibrarianComponent
          },
          {
            path: 'edit/:id',
            component: CreateLibrarianComponent
          },
        ]
      },
      {
        path: 'book',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: '/app/admin/book/list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListBookComponent
          },
          {
            path: 'create',
            component: CreateBookComponent
          },
          {
            path: 'edit/:id',
            component: CreateBookComponent
          },
          {
            path: 'borrow/:id',
            component: BorrowBookComponent
          },
          {
            path: 'me',
            component: BorrowedBookComponent
          },
        ]
      },
      {
        path: 'my-books',
        component: BorrowedBookComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'book-requests',
        component: BookRequestComponent,
        canActivate: [AuthGuard],
      },
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ListStudentComponent,
    CreateStudentComponent,
    CreateLibrarianComponent,
    ListLibrarianComponent,
    ListBookComponent,
    CreateBookComponent,
    BorrowBookComponent,
    BorrowedBookComponent,
    BookRequestComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule
    ]
})
export class AdminModule { }
