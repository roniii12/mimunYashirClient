import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-name-value',
  templateUrl: './name-value.component.html',
  styleUrls: ['./name-value.component.scss']
})
export class NameValueComponent implements OnInit {

  constructor() { }

  @Input() name!: any;
  @Input() value!: any;

  ngOnInit(): void {
  }

}
