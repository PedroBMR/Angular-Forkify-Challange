import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private shoppingList: Ingredient[] = [];
  private shoppingListSubject = new BehaviorSubject<Ingredient[]>([]);

  shoppingList$ = this.shoppingListSubject.asObservable();

  constructor() {
    this.loadShoppingList(); 
  }

  private loadShoppingList() {
    const savedList = localStorage.getItem('shoppingList');
    this.shoppingList = savedList ? JSON.parse(savedList) : [];
    this.shoppingListSubject.next(this.shoppingList);
  }

  private saveShoppingList() {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    this.shoppingListSubject.next(this.shoppingList);
  }

  addIngredient(newIngredient: Ingredient) {
    const existingIngredient = this.shoppingList.find(
      item => item.description === newIngredient.description
    );
  
    if (existingIngredient) {
      existingIngredient.quantity = (parseFloat(existingIngredient.quantity || '1') + parseFloat(newIngredient.quantity || '1')).toString();
    } else {
      this.shoppingList.push({
        description: newIngredient.description, 
        quantity: newIngredient.quantity,
        unit: newIngredient.unit
      });
    }
  
    this.saveShoppingList(); 
  }

  removeIngredient(description: string) {
    this.shoppingList = this.shoppingList.filter(item => item.description !== description);
    this.saveShoppingList();
  }

  clearList() {
    this.shoppingList = [];
    this.saveShoppingList();
  }

  getShoppingList(): Ingredient[] {
    return this.shoppingList;
  }
}
