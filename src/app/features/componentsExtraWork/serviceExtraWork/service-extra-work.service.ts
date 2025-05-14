import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { RegisterExtraWork } from '../interface/RegisterExtraWork.interface';
import { ViewExtraWork } from '../interface/ViewExtraWork.interface';
import { EmployeeList } from '../../../core-layout/interface/EmployeeList.interface';
import { Employee } from '../../componentsWork/interface/Employee.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceExtraWork {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateExtraWork(role: ViewExtraWork): Observable<ViewExtraWork> {

    return this.#http.post<ViewExtraWork>(`${this.#url()}extrawork/register`, role).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListExtraWork(page?: number, search?: string): Observable<Pageable<ViewExtraWork>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<ViewExtraWork>>(`${this.#url()}extrawork/get-all`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListExtraWorkByDate(workId: number, dateSpecify: string): Observable<Employee[]> {

    var params = new HttpParams().set('workId', workId).set('dateSpecify', dateSpecify);

    return this.#http.get<Employee[]>(`${this.#url()}extrawork/get-extra-work-date`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpSaveListExtraWork(extraWorkList: RegisterExtraWork): Observable<void> {

    return this.#http.post<void>(`${this.#url()}extrawork/register/extra-work-for-all`, extraWorkList).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteExtraWork(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}extrawork/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
