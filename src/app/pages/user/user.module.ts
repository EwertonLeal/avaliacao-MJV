import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserRegisterComponent } from './user-register/user-register.component';



@NgModule({
  declarations: [
    UserListComponent,
    UserRegisterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    NgbPaginationModule,
    MatIconModule
  ]
})
export class UserModule { }
