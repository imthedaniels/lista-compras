import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface Item {
  nome: string;
  comprado: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items: Item[] = [
    { nome: 'Maçã', comprado: false },
    { nome: 'Banana', comprado: true },
  ];

  itemForm: FormGroup;
  editingItem: Item | null = null; // Adiciona a propriedade para armazenar o item em edição

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
    });
  }

  get itensNaoComprados() {
    return this.items.filter((item) => !item.comprado);
  }

  get itensComprados() {
    return this.items.filter((item) => item.comprado);
  }

  addItem() {
    if (this.itemForm.valid) {
      const itemName = this.itemForm.get('itemName')?.value;

      if (this.editingItem) {
        // Se um item está sendo editado, atualiza seu nome
        this.editingItem.nome = itemName;
        this.editingItem = null; // Limpa a edição
      } else {
        // Caso contrário, adiciona um novo item
        this.items.push({ nome: itemName, comprado: false });
      }

      this.itemForm.reset();
    }
  }

  startEditing(item: Item) {
    this.editingItem = item; // Define o item a ser editado
    this.itemForm.setValue({ itemName: item.nome }); // Preenche o campo de texto com o nome do item
  }

  toggleItem(item: Item) {
    item.comprado = !item.comprado;
  }

  removeItem(item: Item) {
    this.items = this.items.filter((i) => i !== item);
  }
}
