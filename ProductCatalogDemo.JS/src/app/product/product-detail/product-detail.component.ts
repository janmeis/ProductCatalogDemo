import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, ApiService } from 'src/app/services/api.service';
import { first } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';


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
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      extCode: ['', [Validators.required]],
      extGroup: ['', [Validators.required]],
      longName: [''],
      visibility: [false],
      editability: [false],
      type: ['1'],
      description: ['']
    });
  }

  back(): void {
    this.router.navigate(['products'], { relativeTo: this.route.parent });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    // tslint:disable-next-line: forin
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.validateForm.controls.type.setValue( '1');
    this.validateForm.controls.visibility.setValue( false);
    this.validateForm.controls.editability.setValue( false);
  }

  submitForm(product: IProduct): void {
    this.apiService.postProduct(product).pipe(first())
      .subscribe(result => {
        const type = 'success';
        this.message.create(type, `This is a message of ${type}`);
      },
        err => this.message.create('error', err)
      );
  }
}
