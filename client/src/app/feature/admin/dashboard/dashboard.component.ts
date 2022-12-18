import { Component, OnInit } from '@angular/core';
import {BookService} from "../book/services/book.service";
import {StudentService} from "../student/service/student.service";
import {DecodeTokenService} from "../../../shared/services/decode-token.service";
import {IUser} from "../../../shared/models/IUser";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalBooks = 0;
  totalStudents = 0;
  totalLibrarians = 0;
  borrowRequests = 0;
  user: IUser = {}
  constructor(
    private bookService: BookService,
    private studentService: StudentService,
    private token: DecodeTokenService
  ) { }

  async ngOnInit() {
    this.user = this.token.getUser();
    this.borrowRequests = (await this.bookService.getAllBookRequests().toPromise()).result.length
    this.totalBooks = (await this.bookService.getAllBooks().toPromise()).result.length
    this.totalLibrarians = (await this.studentService.getAllUsers().toPromise()).result
      .filter(x => x.role && x.role.includes('LIBRARIAN')).length
    this.totalStudents = (await this.studentService.getAllUsers().toPromise()).result
      .filter(x => x.role && x.role.includes('STUDENT')).length
  }

}
