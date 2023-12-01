import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class=" bg-stone-800 py-3 text-stone-100">
        <div class="flex justify-between max-w-screen-lg px-10 mx-auto">
            <a routerLink="/">Home</a>
            <div class=" flex">
                <a routerLink="/login" class=" me-3">Login</a>
                <a routerLink="/register">Register</a>

            </div>
        </div>
    </nav>
    <main class=" max-w-screen-lg mx-auto p-10">
        <router-outlet />
    </main>
  `
})
export class AppComponent {
  title = 'frontend';
}
