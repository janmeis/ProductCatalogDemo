import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd';
import { forkJoin, from, Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { ApiService, IProduct } from 'src/app/services/api.service';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';


interface IProductCheck extends IProduct {
  checked: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  products$: Observable<IProductCheck[]>;
  isLoading = false;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  private displayedProducts: IProductCheck[];
  private sortName: string | null = null;
  private sortValue: string | null = null;

  constructor(
    private apiService: ApiService,
    private modalService: NzModalService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) {
    _('PRODUCT-LIST.DELETE_MESSAGE');
  }

  ngOnInit() {
    this.isLoading = true;
    this.products$ = this.getProduct$().pipe(
      tap(() => this.isLoading = false)
    );
  }

  currentPageDataChange(products: IProductCheck[]): void {
    this.displayedProducts = products;
  }

  checkAll(value: boolean): void {
    this.displayedProducts.forEach(p => p.checked = value);
    this.isAllDisplayDataChecked = value;
    this.isIndeterminate = false;
  }

  checkedChange() {
    const checkedCount = this.displayedProducts.filter(p => p.checked).length;
    this.isAllDisplayDataChecked = this.displayedProducts.length == checkedCount;
    this.isIndeterminate = checkedCount > 0 && this.displayedProducts.length > checkedCount;
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search() {
    this.isLoading = true;
    this.products$ = this.products$.pipe(
      map(products => products.sort((a, b) =>
        this.sortValue == 'ascend'
          ? (a[this.sortName!] > b[this.sortName!] ? 1 : -1)
          : (b[this.sortName!] > a[this.sortName!] ? 1 : -1)
      )),
      tap(() => this.isLoading = false)
    );
  }

  newProductClick() {
    this.router.navigate(['product'], { relativeTo: this.route.parent });
  }

  deleteProductClick(): void {
    this.translate.get('PRODUCT-LIST.DELETE_MESSAGE').subscribe(result =>
      this.modalService.confirm({
        nzTitle: result,
        nzContent: '<b style="color: red;">Some descriptions</b>',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.isLoading = true;
          this.products$ = forkJoin(
            from(this.displayedProducts.filter(p => p.checked).map(p => p.id)).pipe(
              flatMap(id => this.apiService.deleteProduct(id))
            )).pipe(
              flatMap(() => this.getProduct$()),
              tap(() => this.isLoading = false)
            );
        },
        nzCancelText: 'No',
        nzOnCancel: () => console.log('Cancel')
      })
    );
  }

  private getProduct$ = (): Observable<IProductCheck[]> =>
    this.apiService.getProducts().pipe(
      map((products: IProduct[]) => products.map((p: IProduct) => {
        const pc = p as IProductCheck;
        pc.checked = false;
        return pc;
      }))
    )
}
