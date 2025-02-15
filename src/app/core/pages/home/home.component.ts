import { NoteService } from './../../services/note.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INote } from '../../interfaces/inote';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _NoteService = inject(NoteService);

  notesData: INote[] = [];
  addForm!: FormGroup;
  updateForm!: FormGroup;
  ngOnInit(): void {
    this.addForm = this._FormBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    })
    this.updateForm = this._FormBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    })
    this.displayData();
  }

  addNote(): void {
    if (this.addForm.valid) {
      this._NoteService.postNote(this.addForm.value).subscribe({
        next: (res) => {
          if (res.msg === 'done') {
            this.displayData();
            this.clearForm(this.addForm);
          }
        },
        error: (err) => {
          console.error("Error in add API", err)
        }
      })
    }
  }
  displayData(): void {
    this._NoteService.getNote().subscribe({
      next: (res) => {
        this.notesData = res.notes;
      },
      error: (err) => {
        console.error("Error in add API", err)
      }
    })
  }
  NoteId!: string;
  getNoteData(id: string, title: string, content: string): void {
    this.NoteId = id;
    this.updateForm.get('title')?.patchValue(title)
    this.updateForm.get('content')?.patchValue(content);
  }
  submitUpdate(): void {
    this._NoteService.updateNote(this.NoteId, this.updateForm.value).subscribe({
      next: (res) => {
        if (res.msg === "done") {
          this.displayData();
        }
      },
      error: (err) => {
        console.error("Error in update API:", err);
      }
    })
  }
  clearForm(form: FormGroup): void {
    form.reset();
  }
  deleteNote(id: string): void {
    this._NoteService.deleteNote(id).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.displayData();
        }
      },
      error: (err) => {
        console.error("Error in update API:", err);
      }
    })
  }
}
