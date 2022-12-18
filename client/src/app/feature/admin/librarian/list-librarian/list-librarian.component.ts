import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../shared/models/IUser";
import {StudentService} from "../../student/service/student.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-librarian',
  templateUrl: './list-librarian.component.html',
  styleUrls: ['./list-librarian.component.css']
})
export class ListLibrarianComponent implements OnInit {

  librarians: IUser[] = []
  constructor(
    private librarianService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.librarianService.getAllUsers().subscribe((res) => {
      console.log({res})
      this.librarians = res.result.filter(x => x.role === 'LIBRARIAN');
    })
  }

  editLibrarian(id: any) {
    this.router.navigate(['../edit/', id], {relativeTo: this.activatedRoute})
  }

  deleteLibrarian(id: any) {
    this.librarianService.deleteStudentById(id).subscribe((res) => {
      if (res.success) {
        this.getAllBooks();
      }
    })
  }
}
