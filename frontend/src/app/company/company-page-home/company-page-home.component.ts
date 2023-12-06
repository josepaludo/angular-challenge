import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from 'src/app/components/link-button/link-button.component';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from 'src/app/components/grid/grid.component';


@Component({
    selector: 'app-company-page-home',
    standalone: true,
    imports: [CommonModule, LinkButtonComponent, GridComponent],
    template: `
        <p
            class="m-10 mt-0 text-lg"
            *ngIf="companyService.company"
        >
            {{companyService.company.description}}
        </p>
        <h2
            class="mb-10 text-end"
            *ngIf="companyService.company"
        >
            Employees :
            <span class="font-semibold">
                {{companyService.company.employees.length}}
            </span>
        </h2>
    
        <app-grid
            *ngIf="companyService.company"
        >
            <app-link-button
                [path]="'../employees'"
                title="Company Employees"
                class="w-full h-full"
            />
        </app-grid>



        <h2
            *ngIf="companyService.company && companyService.isAdminAuthorized()"
            class="text-xl my-5 font-semibold"
        >
            Admin Authorized
        </h2>
        <app-grid
            *ngIf="companyService.company && companyService.isAdminAuthorized()"
        >
            <app-link-button
                [path]="'../create-invite-link'"
                title="Create Invite Link"
                class="w-full h-full"
            />
            <app-link-button
                [path]="'../manage-employees'"
                title="Manage Employees"
                class="w-full h-full"
            />
        </app-grid>

        <h2
            *ngIf="companyService.company && companyService.isFounderAuthorized()"
            class="text-xl my-5 font-semibold text-amber-500"
        >
            Founder Authorized
        </h2>
        <app-grid
            *ngIf="companyService.company && companyService.isFounderAuthorized()"
        >
            <app-link-button
                [path]="'../delete-company'"
                title="Delete Company"
                class="w-full h-full"
            />
        </app-grid>
    `
})
export class CompanyPageHomeComponent {

    constructor(public companyService: CompanyService) {}
}
