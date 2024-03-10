import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { dang_nhapComponent } from './dang_nhap/dang_nhap.component';
const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'dang_nhap',component:dang_nhapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
