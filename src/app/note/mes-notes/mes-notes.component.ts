import { Component , OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {NgIf} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mes-notes',
  imports: [
    NgForOf, NgIf,
  ],
  templateUrl: './mes-notes.component.html',
  styleUrl: './mes-notes.component.css'
})
export class MesNotesComponent implements OnInit{
  notes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getNotes();
  }
  
  getNotes() {
    const userData = localStorage.getItem('user'); // récupérer l'objet utilisateur stocké
  
    if (!userData) {
      alert('Utilisateur non connecté ou données utilisateur introuvables.');
      return;
    }
  
    const user = JSON.parse(userData);
  
  
    const studentId = user.id; // récupérer l'id de l'étudiant connecté
  
    this.http.get<any[]>(`http://localhost:8080/etudiant/mesNotes/${studentId}`)
      .subscribe({
        next: (data) => {
          this.notes = data;
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la récupération des notes.');
        }
      });
  }
  
  goBack() {
    this.router.navigate(['/dashboard']); // ou mets ici la route où tu veux aller
  }

}
