import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { WarningComponent } from '../warning/warning.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, WarningComponent],
    template: `
        <h1>Hello from home</h1>
        <button (click)="auth.testAuth()">
            Click
        </button>
        <app-warning
            color="green"
            message="Hello"
        />
    `
})
export class HomeComponent {

    constructor(public auth: AuthService) {}
}
