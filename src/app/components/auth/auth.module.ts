import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TranslateModule} from '@ngx-translate/core'
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import { NameValueModule } from '../shared/name-value/name-value.module';
import { LoadingDialogModule } from '../shared/loading-dialog/loading-dialog.module';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatRippleModule,
    NameValueModule,
    LoadingDialogModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
