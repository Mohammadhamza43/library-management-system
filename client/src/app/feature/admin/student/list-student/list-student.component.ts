import { Component, OnInit } from '@angular/core';
import {IBook} from "../../book/models/IBook";
import {BookService} from "../../book/services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../../../shared/models/IUser";
import {StudentService} from "../service/student.service";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  students: IUser[] = []
  constructor(
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.studentService.getAllUsers().subscribe((res) => {
      console.log({res})
      this.students = res.result.filter(x => x.role === 'STUDENT');
    })
  }

  editStudent(id: any) {
    this.router.navigate(['../edit/', id], {relativeTo: this.activatedRoute})
  }

  deleteStudent(id: any) {
    this.studentService.deleteStudentById(id).subscribe((res) => {
      if (res.success) {
        this.getAllBooks();
      }
    })
  }
}
