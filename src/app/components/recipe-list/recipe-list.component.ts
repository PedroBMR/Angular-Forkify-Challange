import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: any[] = [];
  favoriteRecipes: any[] = [];
  private favoriteSubscription!: Subscription;

  @Output() selectRecipe = new EventEmitter<string>();

  constructor(private recipeService: RecipeService, private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.favoriteSubscription = this.favoriteService.favorites$.subscribe(favorites => {
      this.favoriteRecipes = favorites;
    });
  }

  ngOnDestroy() {
    this.favoriteSubscription.unsubscribe();
  }

  search(query: string) {
    this.recipeService.searchRecipes(query).subscribe(response => {
      this.recipes = response.data.recipes;
    });
  }

  toggleFavorite(recipe: any) {
    if (this.favoriteService.isFavorite(recipe.id)) {
      this.favoriteService.removeFavorite(recipe.id);
    } else {
      this.favoriteService.addFavorite(recipe);
    }
  }

  isFavorite(recipeId: string): boolean {
    return this.favoriteRecipes.some(fav => fav.id === recipeId);
  }
}