import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './app.config';
import { catchError, throwError } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private config: AppConfig, private cache: CacheService) { }

  get apiUrl() : string
  {
    return this.config.config('apiUrl');
  }

  public get(url: string, secure = true) {
    return this.http.get(`${this.config.config('apiUrl')}${url}`, this.getOptions(secure)).pipe(
      catchError(this.handleError)
    );
  }

  public post(url: string, data = {}, secure = true) {
    return this.http.post(`${this.config.config('apiUrl')}${url}`, data, this.getOptions(secure)).pipe(
      catchError(this.handleError)
    );
  }

  public put(url: string, data = {}, secure = true) {
    return this.http.put(`${this.config.config('apiUrl')}${url}`, data, this.getOptions(secure)).pipe(
      catchError(this.handleError)
    );
  }

  public patch(url: string, data = {}, secure = true) {
    return this.http.patch(`${this.config.config('apiUrl')}${url}`, data, this.getOptions(secure)).pipe(
      catchError(this.handleError)
    );
  }

  public delete(url: string, secure = true) {
    return this.http.delete(`${this.config.config('apiUrl')}${url}`, this.getOptions(secure)).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  private getOptions(secure:boolean = true) {
    let headers: any = {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    };
    if (secure) {
      headers['Authorization'] = `Bearer ${this.cache.get('token')}`;
    }
    return {
      reportProgress: true,
      headers: new HttpHeaders(headers)
    };
  }

}
