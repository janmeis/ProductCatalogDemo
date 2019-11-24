import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';


interface Breadcrumb {
  label: string;
  url: string;
}

const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

// https://medium.com/@bo.vandersteene/angular-5-breadcrumb-c225fd9df5cf
// https://stackblitz.com/edit/angular-s4fvjg
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    ) { }

  ngOnInit() {
    const breadcrumb: Breadcrumb = {
      label: 'Home',
      url: ''
    };

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(async event => {
        const root: ActivatedRoute = this.route.root;
        this.breadcrumbs = await this.getBreadcrumbs(root);
        this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
      });
  }


  private async getBreadcrumbs(route: ActivatedRoute, breadcrumbUrl: string = '', breadcrumbs: Breadcrumb[] = []): Promise<Breadcrumb[]> {
    // get the child routes
    const children: ActivatedRoute[] = route.children;
    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children
      // verify primary route
      .filter(c => c.outlet === PRIMARY_OUTLET && c.snapshot.url.length > 0)) {
      // verify the custom data property 'breadcrumb' is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, breadcrumbUrl, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      breadcrumbUrl += `/${routeURL}`;

      // add breadcrumb
      const breadcrumbLabel = await this.translate.get(child.snapshot.data[ROUTE_DATA_BREADCRUMB]).toPromise();
      const breadcrumb: Breadcrumb = {
        label: breadcrumbLabel,
        url: breadcrumbUrl
      };
      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, breadcrumbUrl, breadcrumbs);
    }
    return breadcrumbs;
  }
}
