import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { ShoppingListService } from '../../services/shopping-list.service';
import { FavoriteService } from '../../services/favorite.service';
import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnChanges {
  @Input() recipeId!: string;
  recipe: any = null;
  isFavorite: boolean = false; // 🔥 Estado para verificar se a receita é favorita

  constructor(
    private recipeService: RecipeService, 
    private shoppingListService: ShoppingListService,
    private favoriteService: FavoriteService // 🔥 Adicionando o serviço de favoritos
  ) {}

  ngOnChanges() {
    if (this.recipeId) {
      this.loadRecipe();
    }
  }

  loadRecipe() {
    this.recipeService.getRecipe(this.recipeId).subscribe(response => {
      this.recipe = response.data.recipe;
      this.checkIfFavorite();
    });
  }

  /** 🔥 Verifica se a receita já está favoritada */
  checkIfFavorite() {
    this.isFavorite = this.favoriteService.isFavorite(this.recipeId);
  }

  /** 🔥 Adiciona ou remove a receita dos favoritos */
  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.recipeId);
    } else {
      this.favoriteService.addFavorite({
        id: this.recipeId,
        title: this.recipe.title,
        image_url: this.recipe.image_url
      });
    }
    this.isFavorite = !this.isFavorite; // 🔥 Atualiza o estado do botão
  }

  /** 🔥 Adiciona todos os ingredientes ao carrinho de compras */
  addAllToShoppingList() {
    if (this.recipe && this.recipe.ingredients) {
      this.recipe.ingredients.forEach((ingredient: Ingredient) => {
        this.shoppingListService.addIngredient({
          description: ingredient.description,
          quantity: ingredient.quantity ? String(ingredient.quantity) : '1',
          unit: ingredient.unit || ''
        });
      });
    }
  }
}
