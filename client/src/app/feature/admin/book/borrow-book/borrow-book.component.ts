import { Component, OnInit } from '@angular/core';
import {IBook} from "../models/IBook";
import {BookService} from "../services/book.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-borrow-book',
  templateUrl: './borrow-book.component.html',
  styleUrls: ['./borrow-book.component.css']
})
export class BorrowBookComponent implements OnInit {

  createBookForm!: any
  book: IBook = {} as IBook;
  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((param) => {
      const id = param.id;
      if (id) {
        this.getBookForUpdate(id);
      }
    })

    this.createBookForm = this.fb.group({
      book_name: ['', [Validators.required]],
      book_author: ['', [Validators.required]],
      book_price: ['', [Validators.required]],
      book_qty: ['', [Validators.required]],
      book_status: ['', [Validators.required]],
      book_isbn: ['', [Validators.required]]
    })
  }

  submit() {
    if (this.createBookForm.invalid) {
      this.createBookForm.markAllAsTouched();
      return
    }
    console.log(this.book);
    this.mapValuesToModel()
    if (this.book && this.book._id) {
      this.bookService.updateBook(this.book).subscribe((res) => {
        if (res.success) {
          this.createBookForm.reset();
          this.router.navigate(['../../list'], {relativeTo: this.activatedRoute})
        }
      })
    } else {
      this.bookService.createBook(this.book).subscribe((res) => {
        if (res.success) {
          this.createBookForm.reset();
          this.router.navigate(['../list'], {relativeTo: this.activatedRoute})
        }
      })
    }
  }

  private getBookForUpdate(id: any) {
    this.bookService.getBookById(id).subscribe((res) => {
      if (res.success) {
        this.book = res.result
        this.patchBook(this.book)
      }
    })
  }

  private patchBook(book: IBook) {
    this.createBookForm.patchValue({
      book_name: book.book_name,
      book_author: book.book_author,
      book_price: book.book_price,
      book_qty: book.book_qty,
      book_status: book.book_status,
      book_isbn: book.book_isbn
    })
  }

  private mapValuesToModel() {
    this.book.book_name = this.createBookForm.value.book_name
    this.book.book_author = this.createBookForm.value.book_author
    this.book.book_price = this.createBookForm.value.book_price
    this.book.book_qty = this.createBookForm.value.book_qty
    this.book.book_isbn = this.createBookForm.value.book_isbn
    this.book.book_status = this.createBookForm.value.book_status
  }
}
