import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { UserRegisterComponent } from "./user-register/user-register.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: UserListComponent,
      },
      {
        path: 'register',
        component: UserRegisterComponent
      },
      {
        path: 'view/:id',
        component: UserRegisterComponent
      },
      {
        path: 'update/:id',
        component: UserRegisterComponent
      }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }