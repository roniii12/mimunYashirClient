import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameValueComponent } from './name-value.component';



@NgModule({
  declarations: [NameValueComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NameValueComponent
  ]
})
export class NameValueModule { }
