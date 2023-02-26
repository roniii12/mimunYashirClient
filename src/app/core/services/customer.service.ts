import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import {TranslateService} from '@ngx-translate/core'
import { BehaviorSubject, map, of, tap, catchError, switchMap } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { UpdateAddressModel } from '../models/update-address.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService {

  constructor(
    httpClient: HttpClient,
    translateService:TranslateService
    ) {
      super(httpClient, 'api/Customer', translateService);
    }

  customerDetailsChange = new BehaviorSubject<CustomerModel | null>(null);
  errorChange = new BehaviorSubject<string | null>(null);
  isLoadingChange = new BehaviorSubject<boolean>(false);

  handleErrorCustomer(error:any){
    const errMsg = this.generalErrorMessage(error);
    this.errorChange.next(errMsg);
    this.isLoadingChange.next(false);
    setTimeout(() => {
      this.errorChange.next(null);
    }, 10);
    return of(errMsg);
  }
    
    getCustomerDetails(){
      this.isLoadingChange.next(true);
      return this.get<CustomerModel | null>('CustomerDetails').pipe(
        tap(customerDetails => this.customerDetailsChange.next(customerDetails)),
        tap(()=>this.isLoadingChange.next(false)),
        catchError(error => this.generalErrorMessage(error))
      );
    }

    updateCustomerAddress(address: UpdateAddressModel){
      this.isLoadingChange.next(true);
      return this.post<UpdateAddressModel | null>('UpdateCustomerAddress',
      address).pipe(
        switchMap(() => this.getCustomerDetails()),
        catchError(error => this.generalErrorMessage(error))
      );
    }
}
