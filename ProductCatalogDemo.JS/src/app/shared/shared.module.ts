import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import cs from '@angular/common/locales/cs';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { cs_CZ, NgZorroAntdModule, NzConfig, NZ_CONFIG, NZ_I18N } from 'ng-zorro-antd';
import { IconsProviderModule } from '../icons-provider.module';

registerLocaleData(cs);

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

// AoT requires an exported function for factories
export const HttpLoaderFactory = (httpClient: HttpClient) =>
  new TranslateHttpLoader(httpClient);

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ScrollingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ScrollingModule,
    TranslateModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: cs_CZ },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
})
export class SharedModule { }
