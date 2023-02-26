import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms'
import { take } from 'rxjs';
import { BaseComponent } from 'src/app/core/cummon/base.component';
import { LoginModel } from 'src/app/core/models/login.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    public authService: AuthService
  ) {
    super();
   }

  loginForm!: FormGroup;
  users?: LoginModel[];
  isLoading!: boolean;

  ngOnInit(): void {
    this.authService.isLoadingChange.pipe(takeUntil(this.destroyed$)).subscribe(isLoading=>{
      this.isLoading = isLoading;
    })
    this.authService.fetchUsersFromStorage();
    this.authService.usersChange.pipe(takeUntil(this.destroyed$),tap(users=>{
      if(users?.length === 1 && !this.authService.isLoadingChange.value){
        this.authService.login(users[0]).subscribe();
      }
    })).subscribe(users=>{
      this.users = users;
    });
    this.initForm();
  }

  onSubmit() {
    if(this.loginForm.invalid) return;
    const login = {
      ...this.loginForm.value
    } as LoginModel
    this.onLogin(login);
  }

  onLogin(login: LoginModel) {
    this.authService.login(login).pipe(take(1)).subscribe(()=>{
      this.loginForm.reset();
    });
  }

  private initForm(){
    const initId = '';
    this.loginForm = new FormGroup({
      id: new FormControl(initId, [Validators.required, this.validateId]),
    });
  }
  private validateId(ctrl:AbstractControl){
    let id = ctrl.value?.trim?.();
    if(!id) return null;
    const err = {invalidId: true};
    if (id?.length > 9 || id?.length < 5 || isNaN(id)) return err;
  	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    const isValid = Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
    if(!isValid) return err;
    return null;
  }

  ngOnDestroy(){
    this.onDestroy();
  }
}
