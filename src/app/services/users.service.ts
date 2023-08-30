import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JWT} from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseApiUrl: string="https://localhost:7181";
  constructor(private  http: HttpClient) { }

  //Fait appel au backend pour l'inscription
  register(newUser:User): Observable<JWT>{
    newUser.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<JWT>(this.baseApiUrl +"/api/users", newUser);
  }

  // Fait appel au backend pour la connexion
  login(logingUser:User): Observable<JWT>{
    logingUser.id='00000000-0000-0000-0000-000000000000';

    return this.http.post<JWT>(this.baseApiUrl +"/api/users/login", logingUser);
  }
  
  //Fait appel au backend pour update l'user
  updateUser(id: string, updatedEmail: string, updatedPassword: string): Observable<any> {
    const url = `${this.baseApiUrl}/api/users/${id}`;
    const params = {
      updatedEmail: updatedEmail,
      updatedPassword: updatedPassword
    };
    return this.http.put(url, null, { params });
  }

  // Fait appel au backend pour le delete
  deleteUser(id:string): Observable <User> {
    return this.http.delete<User>(this.baseApiUrl+'/api/users/'+id);
  }
}
