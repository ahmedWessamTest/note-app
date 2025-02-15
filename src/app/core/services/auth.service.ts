import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrls } from '../base/environment/baseUrls.environment';
import { AuthEndpoints } from '../enums/auth.endpoints';
import { AuthAbstraction } from '../base/abstractions/auth.abstraction';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthAbstraction {
  private readonly _HttpClient = inject(HttpClient);
  postEmail(data: any): Observable<any> {
    return this._HttpClient.post(`${BaseUrls.mainUrl}${AuthEndpoints.SIGNUP}`, data);
  }
  postEmailLogin(data: any): Observable<any> {
    return this._HttpClient.post(`${BaseUrls.mainUrl}${AuthEndpoints.SIGNIN}`, data);
  }
}
