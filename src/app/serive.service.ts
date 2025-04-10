import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriveService {

  private apiUrl = environment.apiUrl; // URL de l'API définie dans l'environnement

  constructor(private http: HttpClient) {} // Injection du service HttpClient

  // Gestion des erreurs HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur HTTP:', error);
    return throwError(
      () => new Error('Une erreur s\'est produite. Veuillez réessayer plus tard.')
    );
  }

// === Gestion des étudiants ===

  // Créer un étudiant
  createEtudiant(etudiant: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/secretaire/ajoutEtudiant`, etudiant)
      .pipe(catchError(this.handleError));
  }

  // Lister tous les étudiants
  getEtudiants(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/secretaire/listeEtudiant`)
      .pipe(catchError(this.handleError));
  }

  // Modifier un étudiant par son ID
  updateEtudiant(id: number, etudiant: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/secretaire/modifierEtudiant/${id}`, etudiant)
      .pipe(catchError(this.handleError));
  }

  // Supprimer un étudiant par son ID
  deleteEtudiant(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/secretaire/supprimerEtu/${id}`)
      .pipe(catchError(this.handleError));
  }

// === Gestion des notes ===

  // Créer une note
  createNote(id:number,note: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/secretaire/ajoutNote/${id}`, note)
      .pipe(catchError(this.handleError));
  }

  // Lister toutes les notes des etudiants
  getNotes(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/secretaire/listeNote`)
      .pipe(catchError(this.handleError));
  }

  // Modifier une note par son ID
  updateNote(id: number, note: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/secretaire/modifierNote/${id}`, note)
      .pipe(catchError(this.handleError));
  }

  // Supprimer la note d'étudiant par son ID
  deleteNote(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/secretaire/supprimerNote/${id}`)
      .pipe(catchError(this.handleError));
  }
  

  //Pour gérer le profil
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/auth/${username}`);
  }

}
