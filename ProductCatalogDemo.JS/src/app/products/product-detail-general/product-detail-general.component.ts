import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { stringify } from 'querystring';
import { of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { EProductType, IProduct } from 'src/app/services/api-models';
import { ApiService } from 'src/app/services/api.service';
import { ProgressService } from 'src/app/shared/services/progress.service';


@Component({
  selector: 'app-product-detail-general',
  templateUrl: './product-detail-general.component.html',
  styleUrls: ['./product-detail-general.component.less']
})
export class ProductDetailGeneralComponent implements OnInit {
  validateForm: FormGroup;
  EProductType = EProductType;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private notification: NzNotificationService,
    public progress: ProgressService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.validateForm = this.getValidateForm();
    const id = this.route.snapshot.params.id;
    if (id && +id > 0) {
      this.progress.run(this.apiService.getProduct(+id))
        .subscribe(product => {
          this.mapProduct(product);
          console.log(product);
        },
          err => {
            console.log(err);
            this.progress.run(
              of(this.router.navigate(['/products']))
            ).subscribe();
          }
        );
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
    this.progress.run(
      this.apiService.postProduct(product).pipe(
        flatMap(() => this.translate.get('PRODUCT_DETAIL_GENERAL.SUCCESS_MESSAGE', { value: product.name }))))
      .subscribe(successMessage => {
        this.notification.create('success', successMessage, '');
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
      type: [EProductType.ProductType1],
      description: ['']
    })

  private mapProduct(product: IProduct): void {
    this.validateForm.patchValue(product);

    const isCopy = this.route.snapshot.queryParams.copy;
    if (isCopy) {
      this.validateForm.controls.id.setValue(0);
      const name = this.validateForm.controls.name.value;
      this.validateForm.controls.name.setValue(`${name} - copy`);
      this.validateForm.controls.name.markAsDirty();
    }
  }
}
