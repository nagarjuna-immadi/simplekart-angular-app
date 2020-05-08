import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Guards */
import { AuthGuardService } from '../core/guards/auth-guard.service';
import { AdminGuardService } from '../core/guards/admin-guard.service';
import { StatesResolveGuardService } from '../core/guards/states-resolve-guard.service';

/** Admin Components */
import { AdminComponent } from '../admin/admin/admin.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component';

/** Users Components */
import { UsersListComponent } from '../admin/users/users-list/users-list.component';
import { AddEditUserComponent } from '../admin/users/add-edit-user/add-edit-user.component';

/** Categories Components */
import { CategoriesListComponent } from '../admin/categories/categories-list/categories-list.component';
import { AddEditCategoryComponent } from '../admin/categories/add-edit-category/add-edit-category.component';

/** Products Components */
import { ProductsListComponent } from '../admin/products/products-list/products-list.component';

/** Orders Components */
import { OrdersListComponent } from '../admin/orders/orders-list/orders-list.component';

/** Payments Components */
import { PaymentsListComponent } from '../admin/payments/payments-list/payments-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    children: [
      { path: '', component: AdminDashboardComponent },
      { 
        path: 'users', 
        component: UsersListComponent, 
        data: {
          title: 'Users List'
        }
      },
      { 
        path: 'users/:userId', 
        component: AddEditUserComponent,
        resolve: {
          states: StatesResolveGuardService
        } 
      },
      { path: 'categories', component: CategoriesListComponent },
      { path: 'categories/:categoryId', component: AddEditCategoryComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'payments', component: PaymentsListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }