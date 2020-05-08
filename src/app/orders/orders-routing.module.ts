import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../core/guards/auth-guard.service';

import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  { path: "",  component: OrdersListComponent, canActivate: [AuthGuardService] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }