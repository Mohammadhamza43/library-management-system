import { Component, OnInit } from '@angular/core';
import {IUser} from "../../shared/models/IUser";
import {DecodeTokenService} from "../../shared/services/decode-token.service";
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user!: IUser
  menuItems = [
    {
      name: 'Dashboard',
      path: '/app/admin/dashboard',
      icon: 'bi-house',
      role: [
        'ADMINISTRATOR',
        'STUDENT',
        'LIBRARIAN'
      ]
    },
    {
      name: 'Books',
      path: '/app/admin/book',
      icon: 'bi-journal-richtext',
      role: [
        'ADMINISTRATOR',
        'STUDENT',
        'LIBRARIAN'
      ]
    },
    {
      name: 'Students',
      path: '/app/admin/student',
      icon: 'bi-person',
      role: [
        'ADMINISTRATOR',
      ]
    },
    {
      name: 'Librarians',
      path: '/app/admin/librarian',
      icon: 'bi-person-check',
      role: [
        'ADMINISTRATOR',
      ]
    },
    {
      name: 'My Books',
      path: '/app/admin/my-books',
      icon: 'bi-book',
      role: [
        'STUDENT',
      ]
    },
    {
      name: 'Book Requests',
      path: '/app/admin/book-requests',
      icon: 'bi-book',
      role: [
        'LIBRARIAN'
      ]
    },
  ]
  constructor(
    private tokenService: DecodeTokenService,
    public authService: AuthService
  ) {
    this.user = this.tokenService.getUser()
  }

  ngOnInit(): void {
  }

}
