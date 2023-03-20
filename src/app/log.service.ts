import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import { Log } from './log';
import { BackendApi } from './api';

@Injectable({ providedIn: 'root' })
export class LogService {
  private href = 'http://localhost:3001/logs';
  
  constructor(private _httpClient: HttpClient) { }

  getUser(id: number): Observable<Log> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    return this._httpClient.get<Log>(`${this.href}/${id}`)
  }

  listLogs(sort: string, order: SortDirection, page: number) : Observable<BackendApi<Log>> {
    console.log('href', this.href)
    return this._httpClient.get<BackendApi<Log>>(`${this.href}`)
  }

  // saveUser(user: CreateUser) {
  //   return this._httpClient.post(this.href, user)
  // }

  
}