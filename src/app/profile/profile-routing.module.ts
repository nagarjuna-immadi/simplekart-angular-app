import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/guards/auth-guard.service';

import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: "",  component: ProfilePageComponent, canActivate: [AuthGuardService] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
