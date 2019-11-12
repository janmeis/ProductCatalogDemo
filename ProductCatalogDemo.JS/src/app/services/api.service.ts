import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './api-models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getProducts = (): Observable<IProduct[]> =>
    this.http.get<IProduct[]>(`${environment.apiUrl}/products`)

  getProduct = (id: number): Observable<IProduct> =>
    this.http.get<IProduct>(`${environment.apiUrl}/products/${id}`)

  postProduct = (product: IProduct): Observable<any> =>
    product.id > 0
      ? this.http.put(`${environment.apiUrl}/products/${product.id}`, product)
      : this.http.post<IProduct>(`${environment.apiUrl}/products`, product)

  deleteProduct = (id: number): Observable<IProduct> =>
    this.http.delete<IProduct>(`${environment.apiUrl}/products/${id}`)
}
