import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackerFormComponent } from './component/hacker-form/hacker-form.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', component: HackerFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
