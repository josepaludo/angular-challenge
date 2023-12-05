import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { JoinViaLinkComponent } from './join-via-link/join-via-link.component';

@Component({
    selector: 'app-join-via-link-home',
    standalone: true,
    imports: [CommonModule, JoinViaLinkComponent],
    template: `
        <app-join-via-link
            *ngIf="authService.authenticated; else notAuth"
        />
        <ng-template #notAuth>
            <h1 class="text-3xl mb-10">
                Login or register to join a Company.
            </h1>
            <h2 class="text-xl">
                After you've logged in, use the same link.
            </h2>
        </ng-template>
    `
})
export class JoinViaLinkHomeComponent {

    constructor(public authService: AuthService) {}
}
