import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envinronment } from '../envinronments/envinronments';
import { IReportData, IUserForAdmin, IUserReports } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReport(): Observable<IUserReports[]> { // give user reports
    return this.http.get<IUserReports[]>(
      envinronment.reportsUrl
    );
  }

  getReportData(id: string): Observable<IReportData> { //give data for graph
    let queryParams = new HttpParams().append('id', id);
    return this.http.get<IReportData>(
      envinronment.graphUrl,
      { params: queryParams }
    );
  }

  getUser(): Observable<IUserForAdmin> { // give user info for admin
    return this.http.get<IUserForAdmin>(
      envinronment.usersUrl
    );
  }
}
