import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/core/cummon/base.component';
import { CustomerService } from 'src/app/core/services/customer.service';
import { takeUntil } from "rxjs/operators";
import { CustomerModel } from 'src/app/core/models/customer.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractsComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    private customerService: CustomerService,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService,
  ) {
    super();
   }

   customerDetails!: CustomerModel | null;

  ngOnInit(): void {
    this.customerService.getCustomerDetails().subscribe();
    this.customerService.customerDetailsChange.pipe(takeUntil(this.destroyed$)).subscribe(customerDetails=>{
      this.customerDetails = customerDetails;
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  getStrType(type:number){
    switch (type){
      case 0:
        return this.translateService.instant('packageBasic')
      case 1:
        return this.translateService.instant('premium')
    }
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

}
