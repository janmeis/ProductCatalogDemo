import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthersListComponent } from './others-list/others-list.component';


const routes: Routes = [
  { path: 'others', component: OthersListComponent, data: { breadcrumb: 'ostatní' }, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
