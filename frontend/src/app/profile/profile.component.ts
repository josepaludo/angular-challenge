import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { WarningComponent } from '../components/warning/warning.component';
import { Router } from '@angular/router';


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
            <h1 class=" text-4xl mb-10">
                {{auth.username}}
            </h1>
            <button
                class=" rounded-sm px-3 py-1 font-semibold text-lg text-stone-100 mb-10"
                (click)="onSubmit()"
                [disabled]="buttonDisabled"
                [ngClass]="{
                    'bg-gray-500 cursor-not-allowed': buttonDisabled,
                    'bg-red-500 hover:bg-red-600': !buttonDisabled
                }"
            >
                Logout
            </button>
            <app-warning
                *ngIf="showWarning"
                message="You'll be redirected to the main page."
                color="green"
            />
        </ng-template>
    `
})
export class ProfileComponent {

    buttonDisabled = false
    showWarning = false

    constructor(
        public auth: AuthService,
        private router: Router
    ) {}

    async onSubmit() {
        if (this.buttonDisabled) return
        this.buttonDisabled = true
        const logout = await this.auth.logout()
        this.showWarning = true
        setTimeout(() => {
            this.router.navigate(['/'])
            this.auth.clientSideLogout()
        }, 2000)
    }
}
