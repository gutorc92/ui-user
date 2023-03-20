import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { User, CreateUser } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private href = 'http://localhost:3000/users';
  
  constructor(private _httpClient: HttpClient) { }

  getUser(id: number): Observable<User> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    return this._httpClient.get<User>(`${this.href}/${id}`)
  }

  saveUser(user: CreateUser) {
    return this._httpClient.post(this.href, user)
  }

  updateUser(user: CreateUser) {
    return this._httpClient.patch(this.href, user)
  }

  deleteUser(id: number) {
    return this._httpClient.delete(`${this.href}/${id}`)
  }
}