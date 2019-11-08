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

export interface IProduct {
  id: number;
  name: string;
  code: string;
  extCode: string;
  extGroup: string;
  longName: string;
  visibility: boolean;
  editability: boolean;
  type: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private usersURL = 'https://jsonplaceholder.typicode.com/users';
  private productURL = 'http://localhost:51501/api/products';

  constructor(private http: HttpClient) {
  }

  getUsers = (): Observable<IUser[]> =>
    this.http.get<IUser[]>(this.usersURL)

  getUser = (id: number): Observable<IUser> =>
    this.http.get<IUser>(`${this.usersURL}/${id}`)

  getProducts = (): Observable<IProduct[]> =>
    this.http.get<IProduct[]>(this.productURL)

  getProduct = (id: number): Observable<IProduct> =>
    this.http.get<IProduct>(`${this.productURL}/${id}`)

  postProduct = (product: IProduct): Observable<IProduct> =>
    this.http.post<IProduct>(this.productURL, product)

  putProduct = (product: IProduct): Observable<any> =>
    this.http.put(`${this.productURL}/${product.id}`, product)
}
