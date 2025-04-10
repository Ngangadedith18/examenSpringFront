import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListeComponent } from './etudiants/liste/liste.component';
import { ListeNoteComponent } from './note/liste-note/liste-note.component';
import { MesNotesComponent } from './note/mes-notes/mes-notes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  //chemin de connexion
  { path: 'login', component: LoginComponent },
  //chemin d'inscription
  { path: 'register', component: RegisterComponent },
  //chemin de redirection du register sur login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //chemin de redirection du login sur register : cela facilite les liens <a> des formulaires
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  //chemin de la liste
  { path: 'etudiants', component: ListeComponent },
  //chemin de redirection de modifier et ajouter etudiants
  { path: '', redirectTo: '/etudiants', pathMatch: 'full' },
   //chemin de la liste
   { path: 'note', component: ListeNoteComponent},
  //chemin de redirection de modifier et ajouter note
  { path: '', redirectTo: '/note', pathMatch: 'full' },

  //actions de l'etudiant
  //chemin de la consultation des notes
  { path: 'mes-notes', component: MesNotesComponent },


  //Acceder au dashboard
  { path: 'dashboard', component: DashboardComponent },
  {path:'sidebar',component:SideBarComponent},
  {path:'header',component:HeaderComponent},

  //profil des utilisateurs
  { path: 'profile/:username', component: ProfileComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
