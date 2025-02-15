import { Observable } from "rxjs";

export abstract class AuthAbstraction {
  abstract postEmail(data: any): Observable<any>;
  abstract postEmailLogin(data: any): Observable<any>;

}
