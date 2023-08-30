//Listes des imports
import jwt_decode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { JWT } from "src/app/models/jwt.model";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userData: any;
  updatedEmail: string = ''; 
  updatedPassword: string = ''; 
  errorMessage: string = '';
  JsonToken = new JWT();

  constructor(private userService: UsersService, private router: Router) {}

  //Fonction pour récuperer les données du profil connecté
  ngOnInit(): void {
    const token = localStorage.getItem('JsonWebToken');
    if (token) {
      this.userData = jwt_decode(token);
    }
    console.log(this.userData); 
  }

  //Fonction de déconnexion : retire le token du storage et renvoie sur la page de connexion
  logout() {
    let currentUrl = this.router.url;
    localStorage.removeItem('JsonWebToken');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['login']);
    });
  }

  //Supprime l'utilisateur et renvoie sur la page de connexion
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        let currentUrl = this.router.url;
        localStorage.removeItem('JsonWebToken');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['login']);
        });
      }
    });
  }

  //Permet de modifier le mail et/ou mot de passe 
  updateUser(id: string, updatedEmail: string, updatedPassword: string): void {
    this.userService.updateUser(id, updatedEmail, updatedPassword).subscribe(
      response => {
        console.log('Maj réussi', response);
        //Remplace le précédent token par le nouvea uavec les informations à jour et recharge la page
        if (response.newToken) {
          localStorage.setItem('JsonWebToken', response.newToken);
        }
        location.reload();
      
      },
      (error) => {
        //Récupèrre le message d'erreur 
        this.errorMessage = "Erreur lors de la modification des données vérifier que l'adresse mail et le mot de passe  sont valides";
        console.log(error);
      }
    );
  }
}
