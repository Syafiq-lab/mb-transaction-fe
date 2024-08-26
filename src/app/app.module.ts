import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { TransactionService } from './services/transaction.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { routes } from './app.routes';  // Import your routes

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)  // Configure the RouterModule with your routes
  ],
  providers: [
    AuthService,
    TransactionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]  // Only AppComponent should be bootstrapped here
})
export class AppModule { }
