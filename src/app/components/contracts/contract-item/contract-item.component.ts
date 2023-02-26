import { Component, Input, OnInit } from '@angular/core';
import { ContractModel } from 'src/app/core/models/contract.model';

@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.scss']
})
export class ContractItemComponent implements OnInit {

  constructor() { }

  @Input() contract!: ContractModel;

  ngOnInit(): void {
  }

}
