

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Note } from '../../domain/note'
import { NoteService } from '../../services/note.service'
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DataTable } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers: [NoteService, DatePipe]
})
export class NoteComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['choose',  'description', 'price', 'isActive', 'dateCreated'];
  noteList: Note[];
  selectNote: Note;
  noteFormGroup: FormGroup;
  isAddNote: boolean;
  indexOfNote: number = 0;
  isDeleteNote: boolean;
  totalRecords: number = 0;
  dateCreated: Date;
  // isActivated: string[] = ['True', 'False'];
  maxDate = new Date(Date.now());
  isActive:boolean;
 

  constructor(private noteService: NoteService, private fb: FormBuilder,
    private datePipe: DatePipe, private dialog: MatDialog) {

  }

  @ViewChild('dt') public dataTable: DataTable;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.noteFormGroup = this.fb.group({
      noteId: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      isActive: ['', Validators.required],
      dateCreated: ['', Validators.required]
    });

    this.loadAllNotes();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadAllNotes() {
    this.noteService.getNote().then(notes => {
      this.noteList = notes;


      for (let i = 0; i < this.noteList.length; i++) {
        this.noteList[i].dateCreated =
          this.datePipe.transform(this.noteList[i].dateCreated, 'yyyy-MM-dd');
      }
      this.dataSource = new MatTableDataSource<Note>(this.noteList);
      this.dataSource.paginator = this.paginator;
    });

  }

  resetTable() {
    this.dataTable.reset();
  }


  addNote() {
    this.noteFormGroup.enable();
    this.isDeleteNote = false;
    this.isAddNote = true;
    this.selectNote = {} as Note;
    this.loadAllNotes();
  }


  editNote(Note) {
    this.isActive = this.isActive;
    this.noteFormGroup.enable();
    this.isDeleteNote = false;
    this.indexOfNote = this.noteList.indexOf(Note);
    this.isAddNote = false;
    this.selectNote = Note;
    this.selectNote = Object.assign({}, this.selectNote);

    this.dateCreated = new Date(this.selectNote.dateCreated);

    this.loadAllNotes();
  }

  deleteNote(Note) {

    this.noteFormGroup.disable();
    this.isDeleteNote = true;
    this.indexOfNote = this.noteList.indexOf(Note);
    this.selectNote = Note;
    this.selectNote = Object.assign({}, this.selectNote);
  }

  okDelete() {
    let tmpNoteList = [...this.noteList];
    this.noteService.deleteNote(this.selectNote.noteId)
      .then(() => {
        tmpNoteList.splice(this.indexOfNote, 1);
        this.noteList = tmpNoteList;
        this.selectNote = null;
        this.loadAllNotes();
      });
  }


  saveNote() {
    // this.selectNote.isActive = this.isActive;
    let tmpNoteList = [...this.noteList];


    this.selectNote.dateCreated =
      this.datePipe.transform(this.selectNote.dateCreated, 'yyyy-MM-dd');
    if (this.isAddNote == true) {
      this.noteService.addNote(this.selectNote).then(result => {
        result.dateCreated =
          this.datePipe.transform(this.selectNote.dateCreated, 'yyyy-MM-dd');
        tmpNoteList.push(result);
        this.noteList = tmpNoteList;
        this.selectNote = null;
        this.loadAllNotes();
      });
    }
    else {
      this.noteService.editNote(this.selectNote.noteId, this.selectNote).then(result => {
        result.dateCreated =
          this.datePipe.transform(this.selectNote.dateCreated, 'yyyy-MM-dd');
        tmpNoteList[this.indexOfNote] = result;
        this.noteList = tmpNoteList;
        this.selectNote = null;
        this.loadAllNotes();
      });
    }

  }

  cancelNote() {
    this.selectNote = null;
  }
}