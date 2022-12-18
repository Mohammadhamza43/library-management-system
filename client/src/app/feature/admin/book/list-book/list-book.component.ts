import { Component, OnInit } from '@angular/core';
import {BookService} from "../services/book.service";
import {IBook} from "../models/IBook";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  books: IBook[] = []
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
    this.bookService.getAllBooks().subscribe((res) => {
      console.log({res})
      this.books = res.result;
    })
  }

  editBook(id: any) {
    this.router.navigate(['../edit/', id], {relativeTo: this.activatedRoute})
  }

  deleteBook(id: any) {
    this.bookService.deleteBookById(id).subscribe((res) => {
      if (res.success) {
        this.getAllBooks();
      }
    })
  }

  borrowBook(id: any) {
    this.bookService.borrowBook(id).subscribe((res) => {
      if (res.success) {
      }
    })
    // this.router.navigate(['../borrow/', id], {relativeTo: this.activatedRoute})
  }
}
