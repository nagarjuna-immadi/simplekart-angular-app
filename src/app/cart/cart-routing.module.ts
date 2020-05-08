import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/guards/auth-guard.service';

import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: "",  component: CartComponent, canActivate: [AuthGuardService] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }

