import { Pageable } from './../../../core-layout/paginator/interface/pageable.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Role } from '../interface/Role.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceRole {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateRole(role: Role): Observable<Role> {

    return this.#http.post<Role>(`${this.#url()}role/register`, role).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListRole(page?: number, search?: string): Observable<Pageable<Role>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Role>>(`${this.#url()}role/get-all`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteRolen(id: number): Observable<void> {

    return this.#http.delete<void>(`${this.#url()}role/delete/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

}
