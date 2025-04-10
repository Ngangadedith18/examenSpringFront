import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../dashboard/header/header.component';
import { SideBarComponent } from '../dashboard/side-bar/side-bar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgIf,HeaderComponent, SideBarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userRole: string | null = '';
  user: any;
  username: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    const userData = localStorage.getItem('user'); // récupérer l'objet utilisateur stocké

    if (!userData) {
      alert('Utilisateur non connecté ou données utilisateur introuvables.');
      return;
    }

    const user = JSON.parse(userData);
    const username = user.username; // on récupère le username

    this.http.get<any>(`http://localhost:8080/api/auth/${username}`)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la récupération du profil.');
        }
      });

    this.userRole = user.role;
  }

  goBack() {
    this.router.navigate(['/dashboard']); // retour vers ton dashboard
  }

}
