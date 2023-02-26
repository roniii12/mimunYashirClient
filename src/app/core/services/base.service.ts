import { formatDate } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, flatMap, Observable, of, retryWhen, take, throwError } from 'rxjs';
import { concat } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

export abstract class BaseService {

  private apiUrl: string;
  constructor(protected http: HttpClient,
      apiUrl: string,
      protected translateService: TranslateService
      ) {
      this.apiUrl = `${environment.baseApiUrl}${apiUrl}`
  }

  protected get<T>(endPointUrl: string, headers?: {headers: HttpHeaders}): Observable<T | null> {
      return this.http.get<T>(`${this.apiUrl}/${endPointUrl}`, headers).pipe(
          catchError(this.handleError(endPointUrl, null)));
  }
  protected getReqRes<Request, Response>(endPointUrl: string, entity: Request, headers?: {headers: HttpHeaders}): Observable<Response | null> {
      const params = new HttpParams({fromObject:Object(entity)})
      return this.http.get<Response>(`${this.apiUrl}/${endPointUrl}`,{
          headers:headers?.headers,
          params
      }).pipe(
          catchError(this.handleError(endPointUrl, null)));
  }

  protected getWithoutApiUrl<Response>(url: string, headers?: {headers: HttpHeaders}): Observable<Response | null> {
      return this.http.get<Response>(`${environment.baseApiUrl}${url}`,headers).pipe(
          catchError(this.handleError(url, null)));
  }


  protected post<T>(endPointUrl: string , entity: T, options?: {headers: HttpHeaders}): Observable<T | null> {
      return this.http.post<T>(`${this.apiUrl}/${endPointUrl}`, entity, options)
          .pipe(
              retryWhen(error => {
                  return error.pipe(
                      flatMap((error: any) => {
                          if (error.status === 401) {
                              return of(error.status).pipe(delay(1000));
                          }
                          return throwError(error);
                      }),
                      take(1),
                      concat(throwError(error)));
              }),
              catchError(this.handleError(endPointUrl, null))
          );
  }

  protected postReqResp<Request, Response>(endPointUrl: string, entity: Request): Observable<Response | null> {
      return this.http.post<Response>(`${this.apiUrl}/${endPointUrl}`, entity)
          .pipe(
              retryWhen(error => {
                  return error.pipe(
                      flatMap((error: any) => {
                          if (error.status === 401) {
                              return of(error.status).pipe(delay(1000));
                          }
                          return throwError(error);
                      }),
                      take(1),
                      concat(throwError(error)));
              }),
              catchError(this.handleError(endPointUrl, null))
          );
  }

  handleError<T>(operation = 'operation', result = {} as T): (error: HttpErrorResponse) => Observable<T> {

      return (error: HttpErrorResponse): Observable<T> => {
          console.error(error);

          const message = (error.error instanceof ErrorEvent) ?
              error.error.message :
              `server returned code ${error.status} with body "${error.error}"`;

          console.error(`${operation} failed: ${message}`);

          // Let the app keep running by returning a safe result.
          throw this.handleValidationErrors(error.error);
      };

  }

  handleValidationErrors(error: any) : any {
      let messages: string[] = [];
      messages.push("Failed:");
      if (error.status === 400 && error.title === "One or more validation errors occurred.") {
          for (var key in error.errors) {
              if (error.errors.hasOwnProperty(key)) {
                  messages.push(error.errors[key]);
              }
          }
          return { messages: messages };
      }
      return error;
  }
 
  protected generalErrorMessage(errorMsg:string){
      let errMsg=null;
      switch(errorMsg){
          default:
            errMsg=this.translateService.instant("unkownError");
            break;
      }
      return errMsg;
  }
}
