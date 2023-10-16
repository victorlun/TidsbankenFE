import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user!: User;

  constructor(private readonly http: HttpClient) {}

  loginAttempt() {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users/${userId}`);
  }

  postUser(newUser: User) {
    this.http.post<User>('http://localhost:3000/users', newUser).subscribe({
      next: (reponse) => {
        console.log(reponse, 'user created');
      },
      error: (error) => {
        console.log(error, 'user creation failed');
      },
    });
  }

  get user(): User {
    return this._user;
  }

  set user(val: User) {
    this._user = val;
  }
}
