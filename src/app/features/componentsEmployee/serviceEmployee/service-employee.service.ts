import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { Employee } from '../interface/Employee.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceEmployee {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateEmployee(employee: Employee): Observable<Employee> {

    return this.#http.post<Employee>(`${this.#url()}employee/register`, employee).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListEmployee(page?: number, search?: string): Observable<Pageable<Employee>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Employee>>(`${this.#url()}employee/get-all`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteEmployee(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}employee/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
