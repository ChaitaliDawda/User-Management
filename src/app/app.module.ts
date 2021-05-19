import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppTrimDirective } from './Directives/app-trim.directive';
import { UppercaseDirective } from './Directives/uppercase.directive';
import { UserActionsComponent } from './user-actions/user-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserActionsComponent,
    UppercaseDirective,
    AppTrimDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
