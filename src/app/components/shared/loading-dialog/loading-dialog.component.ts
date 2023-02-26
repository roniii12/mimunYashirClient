import { DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, ElementRef, Inject, Input, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import { MatDialogContainer } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent implements OnInit {

  constructor(
    private translateService:TranslateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elRef: ElementRef,
    // private injector: Injector,
    @Inject(DOCUMENT) private documnt:Document,
    // private dialogRef:MatDialogRef<any>
  ) { }
  @Input() loadingMessage = this.translateService.instant("loading");
  @Input() isDisplayDots = true;
  ngOnInit(): void {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(MatDialogContainer);

    if (this.documnt.querySelector(componentRef.selector) || this.documnt.querySelector('body > .customDialog')) {
      this.documnt.body.appendChild(this.elRef.nativeElement);
    }
  }

}
