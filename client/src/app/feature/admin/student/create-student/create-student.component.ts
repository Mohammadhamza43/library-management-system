import { Component, OnInit } from '@angular/core';
import {IBook} from "../../book/models/IBook";
import {BookService} from "../../book/services/book.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../../../shared/models/IUser";
import {StudentService} from "../service/student.service";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  formTitle = "Create Student"
  createStudentForm!: any
  student: IUser = {} as IUser;
  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((param) => {
      const id = param.id;
      if (id) {
        this.formTitle = "Edit Student"
        this.getBookForUpdate(id);
      }
    })

    this.createStudentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      student_id: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      status: ['', [Validators.required]]
    })
  }

  submit() {
    if (this.createStudentForm.invalid) {
      this.createStudentForm.markAllAsTouched();
      return
    }
    console.log(this.student);
    this.mapValuesToModel()
    if (this.student && this.student._id) {
      this.studentService.updateStudent(this.student).subscribe((res) => {
        if (res.success) {
          this.createStudentForm.reset();
          this.router.navigate(['../../list'], {relativeTo: this.activatedRoute})
        }
      })
    } else {
      this.studentService.createStudent(this.student).subscribe((res) => {
        if (res.success) {
          this.createStudentForm.reset();
          this.router.navigate(['../list'], {relativeTo: this.activatedRoute})
        }
      })
    }
  }

  private getBookForUpdate(id: any) {
    this.studentService.getStudentById(id).subscribe((res) => {
      if (res.success) {
        this.student = res.result
        this.patchBook(this.student)
      }
    })
  }

  private patchBook(student: IUser) {
    this.createStudentForm.patchValue({
      first_name: student.first_name,
      last_name: student.last_name,
      student_id: student.student_id,
      contact_number: student.contact_number,
      email: student.email,
      password: student.password,
      status: student.status
    })
  }

  private mapValuesToModel() {
    this.student.first_name = this.createStudentForm.value.first_name
    this.student.last_name = this.createStudentForm.value.last_name
    this.student.contact_number = this.createStudentForm.value.contact_number
    this.student.email = this.createStudentForm.value.email
    this.student.password = this.createStudentForm.value.password
    this.student.status = this.createStudentForm.value.status
    this.student.student_id = this.createStudentForm.value.student_id
    this.student.role = "STUDENT"
  }
}
