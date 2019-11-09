import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { OthersListComponent } from './others-list/others-list.component';


@NgModule({
  declarations: [OthersListComponent],
  imports: [
    CommonModule,
    OthersRoutingModule
  ]
})
export class OthersModule { }
