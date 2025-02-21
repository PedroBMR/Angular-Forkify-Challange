import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeDetailComponent, ShoppingListComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchQuery = '';
  selectedRecipeId: string = '';
  showFavorites: boolean = false;
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  searchRecipes() {
    if (this.searchQuery.trim() === '') {
      this.recipes = [];
      return;
    }

    this.recipeService.searchRecipes(this.searchQuery).subscribe({
      next: (response) => {
        this.recipes = response.data.recipes;
      },
      error: () => {}
    });
  }

  viewRecipe(recipeId: string) {
    this.selectedRecipeId = recipeId;
  }

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }
}
