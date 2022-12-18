import { Component, OnInit } from '@angular/core';
import {IBook} from "../models/IBook";
import {BookService} from "../services/book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IStudentBooks} from "../models/IStudentBooks";

@Component({
  selector: 'app-borrowed-book',
  templateUrl: './borrowed-book.component.html',
  styleUrls: ['./borrowed-book.component.css']
})
export class BorrowedBookComponent implements OnInit {

  books: IStudentBooks[] = []
  formTitle = "Create Book";
  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getUserBorrowedBooks().subscribe((res) => {
      console.log({res})
      this.books = res.result;
      this.books.map(x => {
        const currentDate = new Date().getTime()
        const returnDate = x.return_date ? new Date(x.return_date).getTime() : null
        if (returnDate) {
          // To calculate the time difference of two dates
          const Difference_In_Time = currentDate - returnDate;
          console.log(Difference_In_Time)
          // To calculate the no. of days between two dates
          const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          x.charges = Difference_In_Days > 0 ? (Math.floor(Difference_In_Days) * 10) : 0
        }
        return x
      })
    })
  }

  /*editBook(id: any) {
    this.router.navigate(['../edit/', id], {relativeTo: this.activatedRoute})
  }*/

  /*deleteBook(id: any) {
    this.bookService.deleteBookById(id).subscribe((res) => {
      if (res.success) {
        this.getAllBooks();
      }
    })
  }*/

  updateBook(req: IStudentBooks, status: string) {
    this.bookService.approveBookRequest({_id: req._id, student_id: req.student_id?._id, book_id: req.book_id?._id, request_status: status}).subscribe((res) => {
      if (res.success) {
        this.getAllBooks();
      }
    })
  }
}
