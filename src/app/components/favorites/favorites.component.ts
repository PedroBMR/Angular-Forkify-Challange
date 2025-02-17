import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  imports: [CommonModule],
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteRecipes: any[] = [];

  @Output() selectRecipe = new EventEmitter<string>(); 

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteRecipes = this.favoriteService.getFavorites();
  }

  viewFavoriteRecipe(recipeId: string) {
    console.log("🔍 Exibindo detalhes da receita favorita:", recipeId);
    this.selectRecipe.emit(recipeId); 
  }

  removeFavorite(recipeId: string) {
    this.favoriteService.removeFavorite(recipeId);
    this.favoriteRecipes = this.favoriteService.getFavorites(); 
  }
}
