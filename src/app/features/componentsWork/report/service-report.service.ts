import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { ReportAllWork } from './interface/ReportAllWork.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceReport {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpGetAllReportWorks(startDate: string, finalDate: string): Observable<ReportAllWork> {

    var params = new HttpParams()
    .set("startDate", startDate)
    .set("finalDate", finalDate);

    return this.#http.get<ReportAllWork>(`${this.#url()}report/get-all`, {params} ).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

}
