import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    }
  };
  disabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usersURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {
  }

  getUsers = (): Observable<IUser[]> =>
    this.http.get<IUser[]>(this.usersURL)

  getUser = (id: number): Observable<IUser> =>
    this.http.get<IUser>(`${this.usersURL}/${id}`)
}
