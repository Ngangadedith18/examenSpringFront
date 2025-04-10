import { Component,inject  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  message: string = '';

  // Injection des dépendances
  private http = inject(HttpClient);
  private router = inject(Router);

  onLogout() {
    this.http.post('http://localhost:8080/api/auth/logout', {}, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.message = "Déconnexion réussie !";
          this.router.navigate(['/login']); // Redirige après la déconnexion
        },
        error: () => {
          this.message = "Échec de la déconnexion.";
        }
      });
  }

  userRole: string | null = '';
  user: any;
  username: string = '';

  ngOnInit() {
    // Récupérer l'objet utilisateur à partir du localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Invité';
    
    // Extraire le rôle de l'utilisateur
    this.userRole = user.role; // Exemple : 'ETUDIANT' ou 'SECRETAIRE'
  }
}
