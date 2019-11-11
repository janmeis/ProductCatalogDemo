import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { ApiService, IProduct } from 'src/app/services/api.service';


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
  isConfirmDialogVisible = false;
  private displayedProducts: IProductCheck[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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
    this.isLoading = true;
    this.products$ = this.products$.pipe(
      map(products => products.sort((a, b) =>
        sort.value == 'ascend'
          ? (a[sort.key!] > b[sort.key!] ? 1 : -1)
          : (b[sort.key!] > a[sort.key!] ? 1 : -1)
      )),
      tap(() => {
        this.isAllDisplayDataChecked = false;
        this.isIndeterminate = false;
        this.isLoading = false;
      })
    );
  }

  isDeleteConfirmed() {
    this.isLoading = true;
    this.products$ = forkJoin(
      from(this.displayedProducts.filter(p => p.checked).map(p => p.id)).pipe(
        flatMap(id => this.apiService.deleteProduct(id))
      )).pipe(
        flatMap(() => this.getProduct$()),
        tap(() => {
          this.isAllDisplayDataChecked = false;
          this.isIndeterminate = false;
          this.isLoading = false;
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
