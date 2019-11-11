import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent implements OnInit {
  selectedIndex: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
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
