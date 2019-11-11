import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'cs']);
    translate.setDefaultLang('cs');
  }

  ngOnInit() {
  }

}
