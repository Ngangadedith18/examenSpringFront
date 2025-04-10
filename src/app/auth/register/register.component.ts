import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //declarations
  secretaire = {
    username: '',
    password: '',
    bureau: '',
    telephone: '',
    role: 'SECRETAIRE'
  };

  etudiant = {
    username: '',
    password: '',
    nom: '',
    prenom: '',
    niveau: '',
    filiere: '',
    role: 'ETUDIANT'
  };

  message: string = '';

  //constructeurs
  constructor(private http: HttpClient, private router: Router) {}

  //fonctions 
  registerSecretaire() {
    this.http.post('http://localhost:8080/api/auth/register/secretaire', this.secretaire)
      .subscribe({
        next: (response) => {
          this.message = "Secrétaire enregistré avec succès !";
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = "Erreur lors de l'enregistrement du secrétaire.";
        }
      });
  }

  //etant donnée que l'etudiant ne peut pas s'enregistrer, nous allons pas utiliser cette méthode dans un formulaire
  //c'etait juste pour faire des tests
  registerEtudiant() {
    this.http.post('http://localhost:8080/api/auth/register/etudiant', this.etudiant)
      .subscribe({
        next: (response) => {
          this.message = "Étudiant enregistré avec succès !";
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.message = "Erreur lors de l'enregistrement de l'étudiant.";
        }
      });
  }


}
