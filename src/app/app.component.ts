import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService } from './shopping-list.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

interface Item {
  id?: number;
  nome: string;
  comprado: boolean;
  userId: string; // Para identificar o dono do item
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items: Item[] = [];
  itemForm: FormGroup;
  editingItem: Item | null = null;
  user: SocialUser | null = null;

  constructor(
    private fb: FormBuilder,
    private shoppingListService: ShoppingListService,
    private authService: SocialAuthService
  ) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.loadItems();
      }
    });
  }
  loadItems(): void {
    if (this.user) {
      this.shoppingListService.getItems(this.user.id).subscribe((items) => {
        console.log('Items carregados:', items);
        this.items = items.map((item) => ({
          id: item.id,
          nome: item.title,
          comprado: item.included,
          userId: item.userId,
        }));
      });
    }
  }

  addItem() {
    if (this.itemForm.valid && this.user) {
      const itemName = this.itemForm.get('itemName')?.value;

      if (this.editingItem) {
        this.editingItem.nome = itemName;
        this.shoppingListService
          .updateItem({
            id: this.editingItem.id!,
            title: itemName,
            included: this.editingItem.comprado,
            userId: this.user.id,
          })
          .subscribe(() => {
            this.editingItem = null;
          });
      } else {
        const newItem = {
          id: Math.random(),
          title: itemName,
          included: false,
          userId: this.user.id,
        };
        this.shoppingListService.addItem(newItem).subscribe((item) => {
          this.items.push({
            id: item.id,
            nome: item.title,
            comprado: item.included,
            userId: item.userId,
          });
        });
      }

      this.itemForm.reset();
    }
  }

  toggleItem(item: Item) {
    if (item.id) {
      item.comprado = !item.comprado;
      this.shoppingListService
        .updateItem({
          id: item.id,
          title: item.nome,
          included: item.comprado,
          userId: item.userId,
        })
        .subscribe();
    }
  }

  startEditing(item: Item) {
    this.editingItem = item;
    this.itemForm.setValue({ itemName: item.nome });
  }

  removeItem(item: Item) {
    if (item.id) {
      this.shoppingListService.deleteItem(item.id).subscribe(() => {
        this.items = this.items.filter((i) => i.id !== item.id);
      });
    }
  }
}
