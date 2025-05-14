import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Revenue } from './interface/Revenue.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceRevenue {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateRevenue(revenue: Revenue): Observable<Revenue> {

    return this.#http.post<Revenue>(`${this.#url()}revenue/register`, revenue).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListRevenue(): Observable<Revenue[]> {

    return this.#http.get<Revenue[]>(`${this.#url()}revenue/get-all`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListRevenueByWorkId$(workId: number): Observable<Revenue[]> {

    return this.#http.get<Revenue[]>(`${this.#url()}revenue/get/${workId}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteRevenue(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}revenue/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
