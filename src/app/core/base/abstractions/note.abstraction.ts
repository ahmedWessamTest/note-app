import { Observable } from "rxjs";

export abstract class NoteAbstraction {
  abstract postNote(data: any): Observable<any>;
  abstract getNote(): Observable<any>;
  abstract updateNote(id: string, data: any): Observable<any>;
  abstract deleteNote(id: string): Observable<any>;
}
