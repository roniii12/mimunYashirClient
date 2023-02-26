import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { PackageModel } from 'src/app/core/models/package.model';
import {TranslateService} from '@ngx-translate/core'

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageItemComponent implements OnInit {

  constructor(
    private translateService:TranslateService
  ) { }

  @Input() package!: PackageModel;
  apexOption!: ApexOptions;
  ngOnInit(): void {
    this.apexOption = {
      chart: {
        height: '150px',
        width: '150px',
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "13px"
            },
            value: {
              color: "#111",
              offsetY: 0,
              fontSize: "20px",
              show: true,
              formatter: function (val) {
                return val + '%'
              }
            }
          }
        }
      },

      stroke: {
        lineCap: "round",
      },
      labels: [this.translateService.instant("usage")],
    };
  }

  getStrType(type:number){
    switch (type){
      case 0:
        return this.translateService.instant('packageComplete')
      case 1:
        return this.translateService.instant('packageBasic')
    }
  }


  getApexChartForPackage(pack: PackageModel){
    return{
      ...this.apexOption,
      series:[( pack.usage / pack.quantity) * 100],
      plotOptions:{
        ...this.apexOption.plotOptions,
        radialBar:{
          ...this.apexOption.plotOptions?.radialBar,
          dataLabels:{
            ...this.apexOption.plotOptions?.radialBar?.dataLabels,
            value:{
              ...this.apexOption.plotOptions?.radialBar?.dataLabels?.value,
              formatter: function (val) {
                return `${pack.usage}/${pack.quantity}`
              }
            }
          }
        }
      }
    } as ApexOptions
  }

}
