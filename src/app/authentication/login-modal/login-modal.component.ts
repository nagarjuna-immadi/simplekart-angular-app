import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  isLogin: Boolean = true;
  loginForm: FormGroup;
  isLoading: boolean = false;
  successMessage: String = '';
  errorMessage: String = '';

  constructor(public activeModal: NgbActiveModal, 
    private fb:FormBuilder, 
    private authService: AuthenticationService, 
    private router:Router) { }

  loginControls = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  };

  signupControls = {
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male', Validators.required]
  };
  
  ngOnInit() {
    this.loginForm = this.fb.group(this.loginControls);
  }

  get form() {
    return this.loginForm.controls;
  }

  resetForm() {
    this.isLogin = !this.isLogin;
    this.successMessage = '';
    this.errorMessage = '';
    if(this.isLogin) {
      this.loginForm = this.fb.group(this.loginControls);
    } else {
      this.loginForm = this.fb.group({
        ...this.loginControls,
        ...this.signupControls
      });
    }
  }

  onSubmit(){
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';
    console.log(this.loginForm.value);
    if(!this.isLogin) {
      this.authService.signup(this.loginForm.value)
      .subscribe(data => {
        if(data && data.message){
          this.loginForm.reset();
          this.resetForm();
          this.isLogin = true;
          this.successMessage = "Account created successfully. Please Login below.";
        } else if(data && data.error){
          this.errorMessage = `Failed to create account. ${data.error}`;
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error ? error.error.error : error.message;
      },
      () => {
        this.isLoading = false;
      });
    } else {
      this.authService.login(this.loginForm.value)
      .subscribe(data => {
        if(data && data.token){
          this.activeModal.close();
          if(this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          }
        } else if(data && data.error){
          this.errorMessage = data.error;
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error ? error.error.error : error.message;
      },
      () => {
        this.isLoading = false;
      });
    }
  }
}
