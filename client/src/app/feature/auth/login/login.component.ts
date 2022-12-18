import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    console.log('login')
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((res) => {
      if (res.success) {
        localStorage.setItem(environment.authTokenKey, res.token);
        this.router.navigate(['/app/admin/dashboard'])
      }
    })
  }

}
