import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginModalComponent } from './login-modal/login-modal.component';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [LoginModalComponent],
  exports: [LoginModalComponent]
})
export class AuthenticationModule { }
