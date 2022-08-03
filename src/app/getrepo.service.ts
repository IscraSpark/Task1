import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportData, User, UserForAdmin, UserReports } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class GetrepoService {
  //user!: User;
  constructor(private http: HttpClient) {}

  getReport(): Observable<UserReports[]> { // give user rports
    return this.http.get<UserReports[]>(
      'http://ds-test-api.herokuapp.com/api/userassessments'
    );
  }

  getReportData(id: string): Observable<ReportData> { //give data for graph
    let queryParams = new HttpParams().append('id', id);
    return this.http.get<ReportData>(
      'http://ds-test-api.herokuapp.com/api/userassessment/graph',
      { params: queryParams }
    );
  }

  getUser(): Observable<UserForAdmin> { // give user info for admin
    return this.http.get<UserForAdmin>(
      'http://ds-test-api.herokuapp.com/api/users'
    );
  }
}
