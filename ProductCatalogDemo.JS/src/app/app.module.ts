import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { ApiService } from './services/api.service';
import { WaitingComponent } from './shared/components/waiting/waiting.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    WaitingComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRoutingModule,
    ProductModule,
    SharedModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
