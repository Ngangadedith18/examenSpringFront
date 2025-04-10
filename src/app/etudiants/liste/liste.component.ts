import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../../dashboard/header/header.component';
import { SideBarComponent } from '../../dashboard/side-bar/side-bar.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SeriveService} from '../../serive.service';

@Component({
  selector: 'app-liste',
  imports: [HeaderComponent, SideBarComponent, NgForOf, ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './liste.component.html',
  styleUrl: './liste.component.css'
})
export class ListeComponent implements OnInit {
  showEditForm = false;
  showAddForm = false;
  selectedEtudiant: any = {};
  newEtudiant: any = {};
  etudiants: any[] = [];
  filteredEtudiants: any[] = [];
  searchQuery = '';

  // Options pour les selects
  niveaux = ['L1', 'L2', 'L3', 'M1', 'M2'];
  filieres = ['GELO', 'Dev-web', 'SRT', 'MAI', 'BAF','MMC','MJF'];

  constructor(private etudiantService: SeriveService) {}

  ngOnInit(): void {
    this.getEtudiants();
  }

  getEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        this.filteredEtudiants = [...data];
      },
      error: (error) => console.error('Erreur:', error),
    });
  }

  filterEtudiants(): void {
    if (!this.searchQuery) {
      this.filteredEtudiants = [...this.etudiants];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredEtudiants = this.etudiants.filter(etudiant =>
        (etudiant.nom && etudiant.nom.toLowerCase().includes(query)) ||
        (etudiant.prenom && etudiant.prenom.toLowerCase().includes(query)) ||
        (etudiant.username && etudiant.username.toLowerCase().includes(query))
      );
    }
  }

  openAddForm(): void {
    this.newEtudiant = {};
    this.showAddForm = true;
  }

  addEtudiant(): void {
    this.etudiantService.createEtudiant(this.newEtudiant).subscribe({
      next: () => {
        this.getEtudiants();
        this.showAddForm = false;
        alert('Étudiant ajouté avec succès !');
      },
      error: (error: any) => console.error('Erreur:', error),
    });
  }

  editEtudiant(etudiant: any): void {
    this.selectedEtudiant = { ...etudiant };
    this.showEditForm = true;
  }

  updateEtudiant(): void {
    this.etudiantService.updateEtudiant(this.selectedEtudiant.id, this.selectedEtudiant).subscribe({
      next: () => {
        this.getEtudiants();
        this.showEditForm = false;
        alert('Étudiant mis à jour avec succès !');
      },
      error: (error) => console.error('Erreur:', error),
    });
  }

  deleteEtudiant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiantService.deleteEtudiant(id).subscribe({
        next: () => {
          this.getEtudiants();
          alert('Étudiant supprimé avec succès !');
        },
        error: (error) => console.error('Erreur:', error),
      });
    }
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.showEditForm = false;
  }

}
