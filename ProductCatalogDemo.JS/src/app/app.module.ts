import { registerLocaleData } from '@angular/common';
import cs from '@angular/common/locales/cs';
import { NgModule } from '@angular/core';
import { cs_CZ, NzConfig, NZ_CONFIG, NZ_I18N } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OthersModule } from './others/others.module';
import { ProductsModule } from './products/products.module';
import { ApiService } from './services/api.service';
import { SharedModule } from './shared/shared.module';


registerLocaleData(cs);

const ngZorroConfig: NzConfig = {
  message: { nzDuration: 5000, nzTop: 0 },
  notification: { nzTop: 240 }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ProductsModule,
    OthersModule,
    SharedModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: cs_CZ },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
