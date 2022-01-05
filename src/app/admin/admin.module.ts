import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { SearchPipe } from '../shared/search.pipe';
import { AuthGuard } from './../shared/auth.guard';
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';



@NgModule({
  declarations: [
    SearchPipe,
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    OrdersPageComponent
  ],
  imports: [
    QuillModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
          { path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
          { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminModule { }
