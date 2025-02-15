import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrls } from '../base/environment/baseUrls.environment';
import { NoteEndpoints } from '../enums/note.endpoints';
import { NoteAbstraction } from '../base/abstractions/note.abstraction';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements NoteAbstraction {

  private readonly _HttpClient = inject(HttpClient)
  private readonly token = '3b8ny__' + localStorage.getItem('token')!;
  postNote(data: any): Observable<any> {
    return this._HttpClient.post(`${BaseUrls.mainUrl}${NoteEndpoints.NOTE}`, data, {
      headers: {
        token: this.token
      }
    });
  }
  getNote(): Observable<any> {
    return this._HttpClient.get(`${BaseUrls.mainUrl}${NoteEndpoints.NOTE}`, {
      headers: {
        token: this.token
      }
    });
  }
  updateNote(id: string, data: any): Observable<any> {
    return this._HttpClient.put(`${BaseUrls.mainUrl}${NoteEndpoints.NOTE}/${id}`, data, {
      headers: {
        token: this.token
      }
    })
  }
  deleteNote(id: string): Observable<any> {
    return this._HttpClient.delete(`${BaseUrls.mainUrl}${NoteEndpoints.NOTE}/${id}`, {
      headers: {
        token: this.token
      }
    })
  }


}
