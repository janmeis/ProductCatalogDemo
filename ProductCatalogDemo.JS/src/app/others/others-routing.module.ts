import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OthersListComponent } from './others-list/others-list.component';


const routes: Routes = [
  { path: 'others', component: OthersListComponent, data: { breadcrumb: 'OTHERS_LIST.TITLE' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
