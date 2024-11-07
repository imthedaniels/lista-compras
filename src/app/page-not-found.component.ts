import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <h1>Página não encontrada</h1>
      <p>A página que você procura não existe.</p>
    </div>
  `,
  styles: [
    `
      .container {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        margin: 50px auto;
        width: 80%;
        max-width: 500px;
      }
      h1 {
        color: red;
      }
    `,
  ],
})
export class PageNotFoundComponent {}
