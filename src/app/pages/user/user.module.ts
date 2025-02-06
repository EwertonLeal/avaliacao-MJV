import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CepMaskDirective } from 'src/app/directive/cep-mask.directive';
import { PhoneMaskDirective } from 'src/app/directive/phone-mask.directive';



@NgModule({
  declarations: [
    UserListComponent,
    UserRegisterComponent,
    CepMaskDirective,
    PhoneMaskDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    NgbPaginationModule,
    MatIconModule,
    NgbToastModule
  ],
  providers: []
})
export class UserModule { }
