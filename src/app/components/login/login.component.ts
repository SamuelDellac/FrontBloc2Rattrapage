// Listes des imports nécéssaire
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "src/app/models/user.model";
import { UsersService } from 'src/app/services/users.service';
import { JWT } from "src/app/models/jwt.model";

// Définition des métadonnées du composant
@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  // Objet pour stocker les informations de l'utilisateur se connectant
  logingUser: User = {
    id: "",
    email: "",
    password: ""
  };

  JsonToken = new JWT();
  errorMessage: string = ''; 

  // Constructeur du component
  constructor(private userService: UsersService, private router: Router) { }

  // Fonction appelée lorsqu'un utilisateur tente de se connecter
  login() {
    this.userService.login(this.logingUser).subscribe(
      (JsonToken) => {
        //Stockage du token et redirection vers la page du profil
        localStorage.setItem('JsonWebToken', JsonToken.token); 
        this.router.navigate(['profil']); 
      },
      // Si la connexion échoue
      (error) => { 
        //Affichage du message d'erreur
        this.errorMessage = "Erreur de connexion. Email ou mot de passe incorrect"; 
        console.log(error); 
      }
    );
  }
}
