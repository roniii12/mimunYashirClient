import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CostomerDetailsComponent } from './components/costomer-details/costomer-details.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthModule } from './components/auth/auth.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NameValueModule } from './components/shared/name-value/name-value.module';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ContractsModule } from './components/contracts/contracts.module';
import { LoadingDialogModule } from './components/shared/loading-dialog/loading-dialog.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';


export function rootLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http,'assets/i18n/','.json')
}

@NgModule({
  declarations: [
    AppComponent,
    CostomerDetailsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      }
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    AuthModule,
    NameValueModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    ContractsModule,
    LoadingDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
