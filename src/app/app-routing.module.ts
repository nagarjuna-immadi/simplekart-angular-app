import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { AdminGuardService } from './core/guards/admin-guard.service';

const routes: Routes = [
  { 
    path: 'admin', 
    loadChildren: './admin/admin.module#AdminModule', 
    canLoad: [AuthGuardService, AdminGuardService] 
  },
  { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersModule' },
  { path: 'products', loadChildren: './products/products.module#ProductsModule' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

