import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Product {
  cod: string;
  name: string;
  description: string;
  amount: string;
  price: string;

}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost/api/product';

  constructor(private http: HttpClient) { }

  public getAll() {

    return this.http.get<[Product]>(this.apiUrl);
  }
  public delete(cod: any) {


    return this.http.delete(this.apiUrl + '/' + cod);
  }
  public update(product: Product, cod: any) {
    return this.http.put(this.apiUrl + '/' + cod, product);
  }
  create(product: Product) {
    return this.http.post(this.apiUrl, product);
  }
}
