//Listes des imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser: any = { email: '', password: '' };
  confirmPassword: string = ''; // New property for password confirmation
  errorMessage: string = '';

  constructor(private userService: UsersService, private router: Router) {}

  //Fonction appelés en cas d'inscription
  register() {
    //Verification de la correspondance des champs de mot de passe
    if (this.newUser.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.userService.register(this.newUser).subscribe({
      next: (response) => {
        //Renvoie sur la page de connexion
        this.router.navigate(['/login']);
      },
      error: (error) => {
        //Affiche l'erreur
        this.errorMessage = "Une erreur s'est produite lors de l'inscription.";
      }
    });
  }
}
