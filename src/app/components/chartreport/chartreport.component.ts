import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Store } from '@ngrx/store';

import { IReportData } from '../../models/interfaces';
import { getReportData } from '../../app-store/app.actions';
import { selectUserReportData } from 'src/app/app-store/app.selectors';

@Component({
  selector: 'app-report',
  templateUrl: './chartreport.component.html',
  styleUrls: ['./chartreport.component.scss'],
})
export class ReportComponent implements OnInit{
  @Input() id!: string;
  data: number[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [];

  ngOnInit() {
    let id: string = this.id;
    this.store.dispatch(getReportData({ id }));
    this.store
      .select(selectUserReportData)
      .subscribe((report: IReportData[]) => {
        Object.entries(report[Number(id) - 1].data).forEach(([key, value]) => {
          this.data.push(value);
          this.barChartLabels.push(key);
        });
        this.barChartData = [{ data: this.data, label: 'Report' }];
      });
  }

  constructor(private store: Store) {}

}
