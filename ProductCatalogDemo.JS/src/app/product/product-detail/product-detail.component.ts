import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { stringify } from 'querystring';
import { first, flatMap } from 'rxjs/operators';
import { ApiService, IProduct } from 'src/app/services/api.service';
// import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private translate: TranslateService
  ) {
    // _('PRODUCT-DETAIL.SUCCESS_MESSAGE');
  }

  ngOnInit() {
    this.validateForm = this.getValidateForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id && +id > 0) {
      this.apiService.getProduct(+id).pipe(first())
        .subscribe(product => {
          this.mapProduct(product);
          console.log(product);
        });
    }
  }

  back(): void {
    this.router.navigate(['products'], { relativeTo: this.route.parent });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.validateForm.controls.id.setValue(0);
    this.validateForm.controls.type.setValue('1');
    this.validateForm.controls.visibility.setValue(false);
    this.validateForm.controls.editability.setValue(false);
  }

  submitForm(product: IProduct): void {
    this.apiService.postProduct(product).pipe(
      flatMap(() => this.translate.get('PRODUCT-DETAIL.SUCCESS_MESSAGE', { value: product.name })),
      first())
      .subscribe(result => {
        this.message.create('success', result);
        this.validateForm.markAsPristine();
      },
        err => this.message.create('error', stringify(err))
      );
  }

  private getValidateForm = (): FormGroup =>
    this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      extCode: ['', [Validators.required]],
      extGroup: ['', [Validators.required]],
      longName: [''],
      visibility: [false],
      editability: [false],
      type: ['1'],
      description: ['']
    })

  private mapProduct(product: IProduct): void {
    for (const key in this.validateForm.controls)
      this.validateForm.controls[key].setValue(product[key]);
  }
}
