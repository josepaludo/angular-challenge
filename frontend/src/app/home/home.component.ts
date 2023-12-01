import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>Hello from home</h1>
        <button (click)="auth.testAuth()">
            Click
        </button>
    `
})
export class HomeComponent {

    constructor(public auth: AuthService) {}
}
