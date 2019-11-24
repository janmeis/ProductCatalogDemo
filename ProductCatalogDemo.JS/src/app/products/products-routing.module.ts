import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


const routes: Routes = [
  {
    path: 'products', data: { breadcrumb: 'PRODUCT_LIST.TITLE' },
    children: [
      { path: '', component: ProductListComponent },
      { path: 'new', component: ProductDetailComponent, data: { breadcrumb: 'PRODUCT_DETAIL.TITLE_NEW' } },
      { path: ':id', component: ProductDetailComponent, data: { breadcrumb: 'PRODUCT_DETAIL.TITLE' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
