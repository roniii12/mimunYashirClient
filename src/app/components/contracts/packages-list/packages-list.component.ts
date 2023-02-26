import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PackageModel } from 'src/app/core/models/package.model';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagesListComponent implements OnInit {

  constructor(
  ) { }

  @Input() packages!: PackageModel[]

  ngOnInit(): void {
  }

}
