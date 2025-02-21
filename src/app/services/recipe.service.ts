import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

  constructor(private http: HttpClient) {}

  searchRecipes(query: string): Observable<any> {
    if (!query.trim()) {
      return new Observable(observer => {
        observer.next({ data: { recipes: [] } });
        observer.complete();
      });
    }
    return this.http.get<any>(`${this.API_URL}?search=${query}`);
  }

  getRecipe(recipeId: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${recipeId}`);
  }
}
