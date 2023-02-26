import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginModel } from './core/models/login.model';
import { AuthService } from './core/services/auth.service';
import { takeUntil } from "rxjs/operators";
import { ReplaySubject } from "rxjs";
import { BaseComponent } from './core/cummon/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnDestroy {
  title = 'mimunYashirClient';
  user!: LoginModel | null;
  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
  ){
    super();
    this.translateService.addLangs(['en', 'he']);
    this.translateService.setDefaultLang('he');
    this.translateService.use('he');
    document.body.setAttribute('dir','rtl');
    this.translateService.onLangChange.subscribe(langChange=>{
      document.body.setAttribute('dir', langChange.lang !== 'he' ? 'ltr' : 'rtl');
    });
    this.fetchUsers();
    // this.authService.usersChange.pipe(takeUntil(this.destroyed$)).subscribe((users: LoginModel[]) => {
    //       this.users = users;
    //     }
    // );
    this.authService.userSelectedChange.pipe(takeUntil(this.destroyed$)).subscribe((user: LoginModel | null) => {
      this.user = user;
    }
);
  }

  private fetchUsers(){
    this.authService.fetchUsersFromStorage();
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }
}
