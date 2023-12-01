import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { WarningComponent } from '../warning/warning.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, WarningComponent],
    template: `
        <app-warning
            *ngIf="!auth.authenticated"
            message="Not logged"
            color="red"
        />
        <ng-template [ngIf]="auth.authenticated">
            <h1 class="text-4xl">{{auth.username}}</h1>
        </ng-template>
    `
})
export class ProfileComponent {

    constructor(public auth: AuthService) {
    }
}
