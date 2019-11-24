import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-others-list',
  templateUrl: './others-list.component.html',
  styleUrls: ['./others-list.component.less']
})
export class OthersListComponent implements OnInit {
  title: string;

  constructor(
    private translate: TranslateService,
  ) {
    _('OTHERS_LIST.TITLE');
  }

  ngOnInit() {
    this.title = this.translate.instant('OTHERS_LIST.TITLE');
  }

}
