import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../icons-provider.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';


// AoT requires an exported function for factories
export const HttpLoaderFactory = (httpClient: HttpClient) =>
  new TranslateHttpLoader(httpClient);

@NgModule({
  declarations: [
    DialogConfirmComponent,
    BreadcrumbComponent
  ],
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
    RouterModule,
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
    BreadcrumbComponent,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    DialogConfirmComponent,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,
    TranslateModule
  ],
  providers: [],
})
export class SharedModule { }
