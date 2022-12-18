import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../shared/models/IUser";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentService} from "../../student/service/student.service";

@Component({
  selector: 'app-create-librarian',
  templateUrl: './create-librarian.component.html',
  styleUrls: ['./create-librarian.component.css']
})
export class CreateLibrarianComponent implements OnInit {

  formTitle = "Create Librarian"
  createLibrarianForm!: any
  librarian: IUser = {} as IUser;
  constructor(
    private librarianService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((param) => {
      const id = param.id;
      if (id) {
        this.formTitle = "Edit Librarian"
        this.getBookForUpdate(id);
      }
    })

    this.createLibrarianForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  submit() {
    if (this.createLibrarianForm.invalid) {
      this.createLibrarianForm.markAllAsTouched();
      return
    }
    console.log(this.librarian);
    this.mapValuesToModel()
    if (this.librarian && this.librarian._id) {
      this.librarianService.updateStudent(this.librarian).subscribe((res) => {
        if (res.success) {
          this.createLibrarianForm.reset();
          this.router.navigate(['../../list'], {relativeTo: this.activatedRoute})
        }
      })
    } else {
      this.librarianService.createStudent(this.librarian).subscribe((res) => {
        if (res.success) {
          this.createLibrarianForm.reset();
          this.router.navigate(['../list'], {relativeTo: this.activatedRoute})
        }
      })
    }
  }

  private getBookForUpdate(id: any) {
    this.librarianService.getStudentById(id).subscribe((res) => {
      if (res.success) {
        this.librarian = res.result
        this.patchBook(this.librarian)
      }
    })
  }

  private patchBook(librarian: IUser) {
    this.createLibrarianForm.patchValue({
      first_name: librarian.first_name,
      last_name: librarian.last_name,
      designation: librarian.designation,
      contact_number: librarian.contact_number,
      email: librarian.email,
      password: librarian.password,
      status: librarian.status
    })
  }

  private mapValuesToModel() {
    this.librarian.first_name = this.createLibrarianForm.value.first_name
    this.librarian.last_name = this.createLibrarianForm.value.last_name
    this.librarian.contact_number = this.createLibrarianForm.value.contact_number
    this.librarian.email = this.createLibrarianForm.value.email
    this.librarian.password = this.createLibrarianForm.value.password
    this.librarian.status = this.createLibrarianForm.value.status
    this.librarian.designation = this.createLibrarianForm.value.designation
    this.librarian.role = "LIBRARIAN"
  }
}
