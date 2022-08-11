import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envinronment } from '../envinronments/envinronments';
import { ReportData, UserForAdmin, UserReports } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getReport(): Observable<UserReports[]> { // give user reports
    return this.http.get<UserReports[]>(
      envinronment.reportsUrl
    );
  }

  getReportData(id: string): Observable<ReportData> { //give data for graph
    let queryParams = new HttpParams().append('id', id);
    return this.http.get<ReportData>(
      envinronment.graphUrl,
      { params: queryParams }
    );
  }

  getUser(): Observable<UserForAdmin> { // give user info for admin
    return this.http.get<UserForAdmin>(
      envinronment.usersUrl
    );
  }
}
