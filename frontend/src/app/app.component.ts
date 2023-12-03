import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class=" bg-stone-800 py-3 text-stone-100">
        <div class="flex justify-between items-center max-w-screen-lg px-10 mx-auto">
            <a class="font-semibold text-lg" routerLink="/">Home</a>
            <div class=" flex" *ngIf="!auth.authenticated; else authenticated">
                <a routerLink="/login" class=" me-3">Login</a>
                <a routerLink="/register">Register</a>
            </div>
            <ng-template #authenticated>
                <a routerLink="/profile">Profile</a>
            </ng-template>
        </div>
    </nav>
    <main class=" max-w-screen-lg mx-auto p-10">
        <router-outlet />
    </main>
  `
})
export class AppComponent {

    title = 'frontend'

    constructor(public auth: AuthService) {}
}
