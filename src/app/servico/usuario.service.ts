import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  nivel: string;

}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost/api/usuario';

  constructor(private http: HttpClient) { }

  getAll() {


    return this.http.get<[Usuario]>(this.apiUrl);
  }
  remove(id: any) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
  create(user: Usuario) {
    return this.http.post(this.apiUrl, user);
  }


  update(user: Usuario, id: any) {
    return this.http.put(this.apiUrl + '/' + id, user);
  }



}
