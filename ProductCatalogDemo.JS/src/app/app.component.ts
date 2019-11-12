import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgressService } from './shared/services/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(
    public progress: ProgressService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'cs']);
    translate.setDefaultLang('cs');
  }

  ngOnInit() {
  }

}
