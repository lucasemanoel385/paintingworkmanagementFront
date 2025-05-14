import { Pageable } from './../../../core-layout/paginator/interface/pageable.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Expense } from './interface/Expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceExpense {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateExpense(expense: Expense): Observable<Expense> {

    return this.#http.post<Expense>(`${this.#url()}expense/register`, expense).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListExpense(page?: number, search?: string): Observable<Pageable<Expense>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Expense>>(`${this.#url()}expense/get-all`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListExpenseByWorkId(workId: number): Observable<Expense[]> {

    return this.#http.get<Expense[]>(`${this.#url()}expense/get/${workId}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteExpense(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}expense/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
