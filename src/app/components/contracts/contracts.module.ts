import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { PackageItemComponent } from './packages-list/package-item/package-item.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { ContractsComponent } from './contracts.component';
import {MatListModule} from '@angular/material/list';
import { NgApexchartsModule } from 'ng-apexcharts';
import {TranslateModule} from '@ngx-translate/core'



@NgModule({
  declarations: [
    ContractsComponent,
    PackagesListComponent,
    PackageItemComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatListModule,
    NgApexchartsModule,
    TranslateModule
  ],
  exports: [
    ContractsComponent,
  ]
})
export class ContractsModule { }
