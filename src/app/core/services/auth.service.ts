import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import {TranslateService} from '@ngx-translate/core'
import { LoginModel } from '../models/login.model';
import { BehaviorSubject, map, of, tap, catchError } from 'rxjs';
import { skipWhile } from "rxjs/operators";

export const USERS_TOKENS = "USERS_TOKENS";
@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    httpClient: HttpClient,
    translateService:TranslateService
    ) {
      super(httpClient, 'api/Authenticate', translateService);
      this.usersChange.pipe(skipWhile(users=>users.length === 0)).subscribe(users=>{
        localStorage.setItem(USERS_TOKENS, JSON.stringify(users??{}));
      });
    }
    usersChange = new BehaviorSubject<LoginModel[]>([]);
    userSelectedChange = new BehaviorSubject<LoginModel | null>(null);
    isLoadingChange = new BehaviorSubject<boolean>(false);
    errorChange = new BehaviorSubject<string | null>(null);

    handleAuthError(error:string){
      const errMsg = this.generalErrorMessage(error);
      this.errorChange.next(errMsg);
      this.isLoadingChange.next(false);
      return of(errMsg);
    }

   login(loginModel:LoginModel){
    this.isLoadingChange.next(true);
    const users = this.fetchUsersFromStorage();
    if(users){
      const user = users.find(item => item.id === loginModel.id);
      if(user) {
        this.userSelectedChange.next(user);
        this.isLoadingChange.next(false);
        return of(users);
      }
    }
    return this.postReqResp<LoginModel, LoginModel>('Login',loginModel).pipe(
      map((res: LoginModel | null)=>{
        if(!res){throw new Error("Failed_Login")}
        this.userSelectedChange.next(res);
        return this.usersChange.value.concat(res);
      }),
      tap((res: LoginModel[]) => {
        this.usersChange.next(res)
        this.isLoadingChange.next(false);
      }),
      catchError(err=>this.handleAuthError(err))
    );
   }

   logOut(){
    const user = this.userSelectedChange.value as LoginModel;
    this.userSelectedChange.next(null);
    const index = this.usersChange.value.findIndex(usr=>usr.id === user?.id);
    const updatedUsers = [...this.usersChange.value]
    if(index > -1)
      updatedUsers.splice(index, 1);
    this.usersChange.next(updatedUsers);
   }

   fetchUsersFromStorage(){
    const storageAuthStr = localStorage.getItem(USERS_TOKENS);
    if(storageAuthStr){
      const users = JSON.parse(storageAuthStr) as LoginModel[];
      this.usersChange.next(users);
      return users;
    }
    return null;
   }
}
