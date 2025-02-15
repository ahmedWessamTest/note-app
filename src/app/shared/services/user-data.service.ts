import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userData!: any;
  shareUserData() {
    const token = localStorage.getItem('token')!;
    const decoded = jwtDecode(token);
  }
}
