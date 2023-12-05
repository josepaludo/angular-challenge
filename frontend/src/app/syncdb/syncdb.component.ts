import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { WarningComponent } from '../components/warning/warning.component';


@Component({
    selector: 'app-syncdb',
    standalone: true,
    imports: [CommonModule, WarningComponent],
    template: `
        <button
            (click)="auth.syncDb()"
            [disabled]="auth.synced"
            [ngClass]="{
                'bg-gray-500 cursor-not-allowed': auth.synced,
                'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400': !auth.synced,
            }"
            class=" font-semibold text-lg text-white px-4 py-2 rounded-sm"
        >
            Sync the Database
        </button>
        <app-warning
            *ngIf="auth.synced"
            message="Database already synced"
            class="mt-5"
            color="green"
        />
    `
})
export class SyncdbComponent {

    constructor(public auth: AuthService) {}
}
