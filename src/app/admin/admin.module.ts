import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { AddEditCategoryComponent } from './categories/add-edit-category/add-edit-category.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { PaymentsListComponent } from './payments/payments-list/payments-list.component';
import { DeleteUserModalComponent } from './users/delete-user-modal/delete-user-modal.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { ViewUserModalComponent } from './users/view-user-modal/view-user-modal.component';

@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, CategoriesListComponent, AddEditCategoryComponent, ProductsListComponent, OrdersListComponent, UsersListComponent, PaymentsListComponent, DeleteUserModalComponent, AddEditUserComponent, ViewUserModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteUserModalComponent, ViewUserModalComponent]
})
export class AdminModule { }
