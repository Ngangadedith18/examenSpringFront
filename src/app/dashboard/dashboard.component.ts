import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HeaderComponent,SideBarComponent,MatCardModule, MatIconModule,HttpClientModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  //declaration
  userRole: string | null = '';
  username: string = '';

  //construteur
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Récupérer l'objet utilisateur à partir du localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Extraire le rôle de l'utilisateur
    this.userRole = user.role; // Exemple : 'ETUDIANT' ou 'SECRETAIRE'
  }
}
