import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites(); // 🔥 Carregar favoritos ao iniciar
  }

  private loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    this.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    this.favoritesSubject.next(this.favorites);
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  addFavorite(recipe: any) {
    if (!this.isFavorite(recipe.id)) {
      this.favorites.push(recipe);
      this.saveFavorites(); // 🔥 Atualiza o LocalStorage
    }
  }

  removeFavorite(recipeId: string) {
    this.favorites = this.favorites.filter(recipe => recipe.id !== recipeId);
    this.saveFavorites();
  }

  isFavorite(recipeId: string): boolean {
    return this.favorites.some(recipe => recipe.id === recipeId);
  }

  getFavorites(): any[] {
    return this.favorites;
  }
}
