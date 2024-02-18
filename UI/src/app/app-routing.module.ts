import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpRegistrationComponent } from './emp-registration/emp-registration.component';
import { EmpSearchComponent } from './emp-search/emp-search.component';

const routes: Routes = [
  {path:'', component: EmpRegistrationComponent},
  {path:'register', component: EmpRegistrationComponent},
  {path:'search', component: EmpSearchComponent},
  {path:'**', component: EmpRegistrationComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
