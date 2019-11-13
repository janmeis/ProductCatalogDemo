import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { stringify } from 'querystring';
import { forkJoin, from, Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';
import { EProductType, IProduct } from 'src/app/services/api-models';
import { ApiService } from 'src/app/services/api.service';
import { ProgressService } from 'src/app/shared/services/progress.service';

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
  allDisplayedData: IProductCheck[];
  isAllDisplayedDataChecked = false;
  isIndeterminate = false;
  isConfirmDialogVisible = false;
  canDelete = false;
  canCopy = false;
  EProductType = EProductType;
  searchValue = '';
  private products: IProduct[];
  private displayedProducts: IProductCheck[];
  private sortName = '';
  private sortValue = '';

  constructor(
    private apiService: ApiService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    public progress: ProgressService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.progress.run(
      this.getProduct$()
    ).subscribe(() => {
    },
      err => this.message.create('error', stringify(err))
    );
  }

  currentPageDataChange(products: IProductCheck[]): void {
    this.displayedProducts = products;
  }

  checkAll(value: boolean): void {
    this.displayedProducts.forEach(p => p.checked = value);
    this.isAllDisplayedDataChecked = value;
    this.isIndeterminate = false;
    this.canDelete = value;
    this.canCopy = value && this.displayedProducts.length == 1;
  }

  checkedChange() {
    const checkedCount = this.displayedProducts.filter(p => p.checked).length;
    this.isAllDisplayedDataChecked = this.displayedProducts.length == checkedCount;
    this.isIndeterminate = checkedCount > 0 && this.displayedProducts.length > checkedCount;
    this.canDelete = checkedCount > 0;
    this.canCopy = checkedCount == 1;
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(searchValue: string): void {
    this.searchValue = searchValue || '';
    this.search();
  }

  isDeleteConfirmed() {
    _('PRODUCT_LIST.DELETE_SUCCESS');
    this.progress.run(
      forkJoin(
        from(this.displayedProducts.filter(p => p.checked).map(p => p.id)).pipe(
          flatMap(id => this.apiService.deleteProduct(id))
        )).pipe(
          flatMap(() => this.getProduct$()),
          flatMap(() => this.translate.get('PRODUCT_LIST.DELETE_SUCCESS')))
    ).subscribe(successMessage => {
      this.notification.create('success', successMessage, '');
      this.resetCheckboxes();
      this.search();
    },
      err => this.message.create('error', stringify(err))
    );
  }

  copyProduct() {
    const data = this.allDisplayedData.find(p => p.checked);
    if (data) {
      const id = data.id;
      this.router.navigate(['/products', id], { queryParams: { copy: true } });
    }
  }

  private search(): void {
    // filter data
    let products = this.products.filter(p => p.name.startsWith(this.searchValue));
    // sort data
    if (this.sortName && this.sortValue)
      products = products.sort((a, b) =>
        this.sortValue == 'ascend'
          ? (a[this.sortName!] > b[this.sortName!] ? 1 : -1)
          : (b[this.sortName!] > a[this.sortName!] ? 1 : -1)
      );

    this.allDisplayedData = this.toCheck(products);
    this.resetCheckboxes();
  }

  private resetCheckboxes() {
    this.isAllDisplayedDataChecked = false;
    this.isIndeterminate = false;
    this.canDelete = false;
    this.canCopy = false;
  }

  private getProduct$ = (): Observable<IProduct[]> =>
    this.apiService.getProducts().pipe(
      tap(products => this.products = products),
      tap(products => this.allDisplayedData = this.toCheck(products))
    )

  private toCheck = (products: IProduct[]): IProductCheck[] =>
    products.map(p => {
      const pc = p as IProductCheck;
      pc.checked = false;
      return pc;
    })
}
