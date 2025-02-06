import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterRoutingModule } from './user-register.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRegisterComponent } from './user-register.component';



@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserRegisterRoutingModule,
    NgbPaginationModule,
    MatIconModule
  ]
})
export class UserListModule { }
