import { Component, OnInit } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { EProductType, IProduct } from 'src/app/services/api-models';
import { ApiService } from 'src/app/services/api.service';
import { ProgressService } from 'src/app/shared/services/progress.service';
import { NzMessageService } from 'ng-zorro-antd';
import { stringify } from 'querystring';

interface IProductCheck extends IProduct {
  checked: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  products: IProductCheck[];
  allDisplayedData: IProductCheck[];
  isAllDisplayedDataChecked = false;
  isIndeterminate = false;
  isConfirmDialogVisible = false;
  EProductType = EProductType;
  private displayedProducts: IProductCheck[];
  private sortName = '';
  private sortValue = '';
  private searchValue = '';

  constructor(
    private apiService: ApiService,
    private message: NzMessageService,
    public progress: ProgressService,
  ) { }

  ngOnInit() {
    this.progress.run(
      this.getProduct$().pipe(
        tap(products => this.products = products)))
      .subscribe(() => {
        this.allDisplayedData = [...this.products];
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
  }

  checkedChange() {
    const checkedCount = this.displayedProducts.filter(p => p.checked).length;
    this.isAllDisplayedDataChecked = this.displayedProducts.length == checkedCount;
    this.isIndeterminate = checkedCount > 0 && this.displayedProducts.length > checkedCount;
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

  search() {
    // filter data
    const data = this.products.filter(p => p.name.startsWith(this.searchValue));
    // sort data
    if (this.sortName && this.sortValue)
      this.allDisplayedData = data.sort((a, b) =>
        this.sortValue == 'ascend'
          ? (a[this.sortName!] > b[this.sortName!] ? 1 : -1)
          : (b[this.sortName!] > a[this.sortName!] ? 1 : -1)
      );
    else
      this.allDisplayedData = data;
  }

  isDeleteConfirmed() {
    this.progress.run(
      forkJoin(
        from(this.displayedProducts.filter(p => p.checked).map(p => p.id)).pipe(
          flatMap(id => this.apiService.deleteProduct(id))
        )).pipe(
          flatMap(() => this.getProduct$()),
          tap(products => this.products = products)))
      .subscribe(() => {
        this.allDisplayedData = [...this.products];
        this.isAllDisplayedDataChecked = false;
        this.isIndeterminate = false;
      },
        err => this.message.create('error', stringify(err))
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
