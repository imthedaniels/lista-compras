import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

interface ShoppingItem {
  id: number;
  title: string;
  userId: string; // Tipo string para suportar o userId do Google
  included: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private apiUrl = 'https://json-server-iqj5.onrender.com/shopping-list';

  constructor(private http: HttpClient) {}
  getItems(userId: string): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.apiUrl).pipe(
      map((items) =>
        items.filter((item: ShoppingItem) => item.userId === userId)
      ),
      catchError((error) => {
        console.error('Erro ao carregar os itens', error);
        return throwError(
          () =>
            new Error('Falha ao carregar os itens. Tente novamente mais tarde.')
        );
      })
    );
  }

  addItem(item: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>(this.apiUrl, item);
  }

  updateItem(item: ShoppingItem): Observable<ShoppingItem> {
    return this.http.put<ShoppingItem>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
