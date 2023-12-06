import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CompanyService } from '../company.service';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-delete-company',
    standalone: true,
    imports: [CommonModule, ButtonComponent, WarningComponent],
    template: `
        <h2 class="text-3xl mb-5">
            Delete Company
        </h2>

        <ng-container *ngIf="companyService.isFounderAuthorized()">
            <h3 class="text-2xl mb-5">
                This action can't be undone.
            </h3>
            <app-button
                (onClick)="handleClick()"
                title="Delete Company"
                color="red"
            />
        </ng-container>

        <app-warning
            *ngIf="!companyService.isFounderAuthorized()"
            message="Unauthorized"
            color="red"
        />
    `
})
export class DeleteCompanyComponent {

    constructor(
        public companyService: CompanyService,
        private router: Router
    ) {}
    
    async handleClick() {
        await this.companyService.deleteCompany()
        this.companyService.deleteCompanyClientSide()
        this.router.navigate(['/companies-list'])
    }
}
