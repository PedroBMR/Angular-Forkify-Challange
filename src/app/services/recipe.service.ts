import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

  constructor(private http: HttpClient) {}

  // Método para buscar receitas por palavra-chave
  searchRecipes(query: string): Observable<any> {
    return this.http.get(`${this.API_URL}?search=${query}`);
  }

  // Método para obter detalhes de uma receita específica pelo ID
  getRecipe(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
