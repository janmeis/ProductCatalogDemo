import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  title: string;
  selectedIndex: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private translate: TranslateService,
  ) {
    _('PRODUCT_DETAIL.TITLE_NEW');
    _('PRODUCT_DETAIL.TITLE');
  }

  ngOnInit() {
    this.title = this.translate.instant('PRODUCT_DETAIL.TITLE');
    this.selectedIndex = this.getSelectedIndex();
  }

  private getSelectedIndex(): number {
    const tabName = this.route.snapshot.queryParams.tab;
    switch (tabName) {
      case 'three':
        return 2;
      case 'four':
        return 3;
      default:
        return 0;
    }
  }
}
