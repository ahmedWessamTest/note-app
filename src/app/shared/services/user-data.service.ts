import { Injectable, signal, WritableSignal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData: WritableSignal<any> = signal({});
  shareUserData() {
    const token = localStorage.getItem('token')!;
    this.userData.set(jwtDecode(token));
  }
}
