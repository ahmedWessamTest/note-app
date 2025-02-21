import { NoteService } from './../../services/note.service';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INote } from '../../interfaces/inote';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SubmitButtonComponent } from '../../../shared/components/ui/submit-button/submit-button.component';
declare var Masonry: any;
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, SweetAlert2Module, SubmitButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewChecked {
  private masonry: any;
  ngAfterViewChecked(): void {
    this.masonry = new Masonry('.masonry-grid', {
      itemSelector: '.masonry-grid-item',
      columnWidth: '.masonry-grid-item',
      percentPosition: true,
      gutter: 10
    })
  }
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _NoteService = inject(NoteService);

  notesData: WritableSignal<INote[]> = signal([]);
  addForm!: FormGroup;
  updateForm!: FormGroup;
  NoteId: WritableSignal<string> = signal('');
  noteTitle: WritableSignal<string> = signal('');

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
        if (Array.isArray(res.notes) && res.notes.length > 0) {
          this.notesData.set(res.notes);
        } else {
          console.warn("No notes found.");
          this.notesData.set([]);
        }
      },
      error: (err) => {
        console.error("Error in get note API", err)
        if (err.error.statusCode === 404) {
          this.notesData.set([]);
          console.warn("Notes not found (404).");
        } else if (err.error.statusCode === 500) {
          console.error("Internal server error (500). Please try again later.");
        } else {
          console.error("An unexpected error occurred:", err);
        }
      }
    })
  }

  getNoteData(id: string, title: string, content: string): void {
    this.NoteId.set(id);
    this.noteTitle.set(title);
    this.updateForm.get('title')?.patchValue(title)
    this.updateForm.get('content')?.patchValue(content);
  }
  submitUpdate(): void {
    this._NoteService.updateNote(this.NoteId(), this.updateForm.value).subscribe({
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
  deleteNote(): void {
    this._NoteService.deleteNote(this.NoteId()).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.displayData();
        }
      },
      error: (err) => {
        if (err.error.msg === 'not notes found') {
          this.notesData.set([]);
        }
        console.error("Error in update API:", err);
      }
    })
  }
}
