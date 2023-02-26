import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/core/cummon/base.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { takeUntil } from "rxjs/operators";
import { FormGroup, FormControl } from '@angular/forms'
import { CustomerModel } from 'src/app/core/models/customer.model';
import { UpdateAddressModel } from 'src/app/core/models/update-address.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    public translateService: TranslateService,
    public authService: AuthService,
    public customerService: CustomerService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  addressForm? :FormGroup;
  customerDetails?: CustomerModel | null;
  isLoading!: boolean;
  message!:string;

  ngOnInit(): void {
    this.customerService.isLoadingChange.pipe(takeUntil(this.destroyed$)).subscribe(isLoading=>{
      this.isLoading = isLoading;
      if(this.message){
        const isError = !!this.customerService.errorChange.value;
        this.snackBar.open(isError ? this.translateService.instant('unkownError') : this.message, this.translateService.instant('close'),{
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: isError ? 'snack-failed' : "snack-success",
          duration: 3000
        });
        this.message = "";
      }
    });
    this.customerService.customerDetailsChange.pipe(takeUntil(this.destroyed$)).subscribe(customerDetails => {
      this.customerDetails = customerDetails;
      this.initForm();
    })
  }

  onChangeLang(){
    this.translateService.use(this.translateService.currentLang === 'he' ? 'en' : 'he')
  }

  onChangeCustomer(){
    this.authService.userSelectedChange.next(null);
  }
  onSubmit(){
    if(!this.addressForm?.valid) return;
    const updateAddress = {
      ...this.addressForm?.value
    } as UpdateAddressModel;
    this.customerService.updateCustomerAddress(updateAddress).subscribe();
    this.message = this.translateService.instant("updateSuccess");
  }

  private initForm(){
    const initCity = this.customerDetails?.city || '';
    const initStreet = this.customerDetails?.street || '';
    const initApartment = this.customerDetails?.apartment || "";
    const initZip = this.customerDetails?.zip || "";
    this.addressForm = new FormGroup({
      city: new FormControl(initCity),
      street: new FormControl(initStreet),
      apartment: new FormControl(initApartment),
      zip: new FormControl(initZip)
    });
  }

  ngOnDestroy(){
    this.onDestroy();
  }

}
