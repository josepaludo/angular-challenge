import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { LinkButtonComponent } from '../components/link-button/link-button.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, LinkButtonComponent],
    template: `
        <div class="flex" >
            <ng-container *ngIf="!auth.authenticated; else authenticatedBlock">
                <app-link-button
                    title="Login"
                    path="/login"
                />
                <app-link-button
                    title="Register"
                    path="/register"
                    class="ms-3"
                />
            </ng-container>

            <ng-template #authenticatedBlock>
                <app-link-button
                    title="Companies"
                    path="/company/home"
                />
                <app-link-button
                    title="Profile"
                    path="/profile"
                    class="ms-3"
                />
            </ng-template>
        </div>
    `
})
export class HomeComponent {

    constructor(public auth: AuthService) {}
}
