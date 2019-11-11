import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { stringify } from 'querystring';
import { first, flatMap } from 'rxjs/operators';
import { EProductType, IProduct } from 'src/app/services/api-models';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-product-detail-general',
  templateUrl: './product-detail-general.component.html',
  styleUrls: ['./product-detail-general.component.less']
})
export class ProductDetailGeneralComponent implements OnInit {
  validateForm: FormGroup;
  EProductType = EProductType;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.validateForm = this.getValidateForm();
    const id = this.route.snapshot.params.id;
    if (id && +id > 0) {
      this.apiService.getProduct(+id).pipe(first())
        .subscribe(product => {
          this.mapProduct(product);
          console.log(product);
        });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.validateForm.controls.id.setValue(0);
    this.validateForm.controls.type.setValue(EProductType.ProductType1);
    this.validateForm.controls.visibility.setValue(false);
    this.validateForm.controls.editability.setValue(false);
  }

  submitForm(product: IProduct): void {
    this.apiService.postProduct(product).pipe(
      flatMap(() => this.translate.get('PRODUCT_DETAIL_GENERAL.SUCCESS_MESSAGE', { value: product.name })),
      first())
      .subscribe(successMessage => {
        this.message.create('success', successMessage);
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
