import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import cs from '@angular/common/locales/cs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { cs_CZ, NgZorroAntdModule, NzConfig, NZ_CONFIG, NZ_I18N } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { ApiService } from './services/api.service';
import { WaitingComponent } from './shared/components/waiting/waiting.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';

registerLocaleData(cs);

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

// AoT requires an exported function for factories
const HttpLoaderFactory = (httpClient: HttpClient) =>
  new TranslateHttpLoader(httpClient);

@NgModule({
  declarations: [
    AppComponent,
    WaitingComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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
