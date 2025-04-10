import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //declarations
  user = { username :'', password: '' };
  message: string = '';

  //construteur
  constructor(private http: HttpClient, private router: Router) {}
  onLogin() {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.user)
      .subscribe({
        next: (response) => { 
          const userObject = {
            username: response.username,
            role: response.role,
            id: response.id,
            ...(response.role === 'ETUDIANT' ? {
              nom: response.nom,
              prenom: response.prenom,
              filiere: response.filiere,
              niveau: response.niveau
            } : {
              bureau: response.bureau,
              telephone: response.telephone
            })
          };
  
          // Stocker l'objet utilisateur dans le localStorage
          localStorage.setItem('user', JSON.stringify(userObject)); // <= ici
  
          this.message = "Connexion réussie !";
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.message = "Échec de la connexion.";
        }
      });
  }


}
