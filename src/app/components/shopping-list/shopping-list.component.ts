import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  imports: [CommonModule]
})
export class ShoppingListComponent implements OnInit {
  shoppingList: any[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingListService.shoppingList$.subscribe(list => {
      this.shoppingList = list;
    });
  }

  removeItem(ingredientName: string) {
    this.shoppingListService.removeIngredient(ingredientName);
  }

  clearList() {
    this.shoppingListService.clearList(); // 🔥 Certifique-se de que o nome do método é 'clearList'
  }
  
  copyShoppingList() {
    const text = this.shoppingList.map(item => `${item.quantity} ${item.unit || ''} - ${item.description}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert('Lista copiada para a área de transferência!');
    });
  }
  
  
}
