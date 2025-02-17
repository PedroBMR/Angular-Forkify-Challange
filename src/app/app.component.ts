import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeListComponent, RecipeDetailComponent, FavoritesComponent, ShoppingListComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  searchQuery = '';
  selectedRecipeId: string = '';
  showFavorites: boolean = false;

  @ViewChild(RecipeListComponent) recipeList!: RecipeListComponent;

  ngAfterViewInit() {
    console.log("RecipeListComponent carregado:", this.recipeList);
  }

  searchRecipes() {
    if (this.recipeList) {
      this.recipeList.search(this.searchQuery);
    }
  }

  viewRecipe(recipeId: string) {
    this.selectedRecipeId = recipeId;
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }
}
