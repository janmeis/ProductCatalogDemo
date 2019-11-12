import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './api-models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly productURL = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts = (): Observable<IProduct[]> =>
    this.http.get<IProduct[]>(this.productURL)

  getProduct = (id: number): Observable<IProduct> =>
    this.http.get<IProduct>(`${this.productURL}/${id}`)

  postProduct = (product: IProduct): Observable<any> =>
    product.id > 0
      ? this.http.put(`${this.productURL}/${product.id}`, product)
      : this.http.post<IProduct>(this.productURL, product)

  deleteProduct = (id: number): Observable<IProduct> =>
    this.http.delete<IProduct>(`${this.productURL}/${id}`)
}
