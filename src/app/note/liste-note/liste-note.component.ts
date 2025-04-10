import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../../dashboard/header/header.component';
import { SideBarComponent } from '../../dashboard/side-bar/side-bar.component';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SeriveService} from '../../serive.service';

@Component({
  selector: 'app-liste-note',
  standalone: true,
  imports: [HeaderComponent, SideBarComponent, NgForOf, FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './liste-note.component.html',
  styleUrl: './liste-note.component.css'
})
export class ListeNoteComponent implements OnInit {
  notes: any[] = [];
  filteredNotes: any[] = [];
  searchQuery = '';
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  selectedNote: any = {};
  newNote: any = {};

  constructor(private noteService: SeriveService, private router: Router) {}

  
  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe({
      next: (data: any[]) => {
        this.notes = data;
        this.filteredNotes = [...data];
      },
      error: (err: any) => console.error('Erreur:', err)
    });
  }

  filterNotes(): void {
    if (!this.searchQuery) {
      this.filteredNotes = [...this.notes];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredNotes = this.notes.filter(note =>
        (note.matiere && note.matiere.toLowerCase().includes(query)) ||
        (note.semestre && note.semestre.toLowerCase().includes(query)) ||
        (note.etudiant.nom && note.etudiant.nom.toLowerCase().includes(query)) ||
        (note.idE && note.idE.toLowerCase().includes(query))
      );
    }
  }

  openAddModal(): void {
    this.newNote ;
    this.showAddModal = true;
  }

  openEditModal(note: any): void {
    this.selectedNote = { ...note };
    this.showEditModal = true;
  }

  openDeleteModal(note: any): void {
    this.selectedNote = { ...note };
    this.showDeleteModal = true;
  }

  addNote(): void {
    this.noteService.createNote(this.newNote.idE,this.newNote).subscribe({
      next: () => {
        this.getNotes();
        this.showAddModal = false;
        alert('Note ajouté avec succès !');
      },
      error: (err: any) => console.error('Erreur:', err)
    });
  }

  updateNote(): void {
    this.noteService.updateNote(this.selectedNote.idN, this.selectedNote).subscribe({
      next: () => {
        this.getNotes();
        this.showEditModal = false;
        alert('Note modifié avec succès !');
      },
      error: (err: any) => console.error('Erreur:', err)
    });
  }

  confirmDelete(): void {
    this.noteService.deleteNote(this.selectedNote.idN).subscribe({
      next: () => {
        this.getNotes();
        this.showDeleteModal = false;
        alert('Note supprimé avec succès !');
      },
      error: (err: any) => console.error('Erreur:', err)
    });
  }

  closeModal(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
  }

}
