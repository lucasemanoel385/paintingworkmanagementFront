import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, catchError, throwError } from 'rxjs';
import { Presence } from '../interface/presence.interface';
import { Pageable } from '../../../core-layout/paginator/interface/pageable.interface';
import { RegisterDiversPresence } from '../interface/RegisterDiversPresence.interface';
import { EmployeeList } from '../../../core-layout/interface/EmployeeList.interface';
import { Employee } from '../../componentsWork/interface/Employee.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicePresence {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreatePresence(presence: Presence): Observable<Presence> {

    return this.#http.post<Presence>(`${this.#url()}presence/register`, presence).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpCreateDiversPresence(presence: RegisterDiversPresence): Observable<Presence> {

    return this.#http.post<Presence>(`${this.#url()}presence/register/presence-for-all`, presence).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListPresence(page?: number, search?: string): Observable<Pageable<Presence>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Presence>>(`${this.#url()}presence/get-all`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListPresenceByDate(workId: number, dateSpecify: string): Observable<Employee[]> {

    var params = new HttpParams().set('workId', workId).set('dateSpecify', dateSpecify);;

    return this.#http.get<Employee[]>(`${this.#url()}presence/get-presence-date`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeletePresence(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}presence/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
