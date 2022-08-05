import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Subscription } from 'rxjs';
import { GetrepoService } from '../../services/getrepo.service';
import { ReportData } from '../../interfaces';
import { Store } from '@ngrx/store';
import { getReportData } from '../../reducers/app.actions';
import { userInfoSelectors } from '../../reducers';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  data: number[] = [];
  sub: Subscription[] = [];
  ngOnInit() {
    let id: string = this.id;
    this.store.dispatch(getReportData({ id }));
    this.store
      .select(userInfoSelectors.selectUserReportData)
      .subscribe((report: ReportData[]) => {
        Object.entries(report[Number(id) - 1].data).forEach(([key, value]) => {
          this.data.push(value);
          this.barChartLabels.push(key);
        });
        this.barChartData = [{ data: this.data, label: 'Report' }];
      });
    // this.sub.push(
    //   this.getrepo.getReportData(this.id).subscribe((report: ReportData) => {
    //     Object.entries(report.data).forEach(([key, value]) => {
    //       this.data.push(value);
    //       this.barChartLabels.push(key);
    //     });
    //     this.barChartData = [{ data: this.data, label: 'Report' }];
    //   })
    // );
  }

  constructor(
    private route: ActivatedRoute,
    private getrepo: GetrepoService,
    private store: Store
  ) {}
  ngOnDestroy(): void {
    this.sub.forEach((el) => el.unsubscribe());
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [];
}
