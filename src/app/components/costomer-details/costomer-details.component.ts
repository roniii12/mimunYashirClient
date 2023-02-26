import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/core/cummon/base.component';
import { CustomerModel } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-costomer-details',
  templateUrl: './costomer-details.component.html',
  styleUrls: ['./costomer-details.component.scss']
})
export class CostomerDetailsComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    private customerService: CustomerService
  ) {
    super();
   }

  customerDetails!:CustomerModel | null;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

}
