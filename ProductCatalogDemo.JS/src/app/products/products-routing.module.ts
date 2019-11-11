import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  {
    path: 'products', data: { breadcrumb: 'Produkty' },
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent, data: { breadcrumb: 'Detail' } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
