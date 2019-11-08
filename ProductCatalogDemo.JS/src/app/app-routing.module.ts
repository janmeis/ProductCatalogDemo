import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingComponent } from './shared/components/waiting/waiting.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/products' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'waiting', component: WaitingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
