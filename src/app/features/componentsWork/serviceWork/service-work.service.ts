import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { Work } from '../interface/Work.interface';
import { WorkView } from '../interface/WorkView.interface';
import { RegisterExtraWork } from '../../componentsExtraWork/interface/RegisterExtraWork.interface';
import { PaymentEmployee } from '../interface/PaymentEmployee.interface';
import { ReportByWorkId } from '../work-report/ReportByWorkId.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceWork {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateWork(work: Work): Observable<Work> {

    return this.#http.post<Work>(`${this.#url()}work/register`, work).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpUpdateWork(work: Work): Observable<Work> {

    return this.#http.put<Work>(`${this.#url()}work/update`, work).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListWork(page?: number, search?: string): Observable<Pageable<Work>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Work>>(`${this.#url()}work/get-all`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
  
  public httpWorkById(id: number): Observable<WorkView> {

    return this.#http.get<WorkView>(`${this.#url()}work/get-id/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteWork(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}work/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpPaymentEmployeeAll(payment: PaymentEmployee): Observable<void> {

    return this.#http.post<void>(`${this.#url()}payment/payment-all-employee`, payment).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpReportByWorkId$(workId: number): Observable<ReportByWorkId> {

    return this.#http.get<ReportByWorkId>(`${this.#url()}report/${workId}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

}
