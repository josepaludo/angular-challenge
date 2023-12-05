import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from 'src/app/components/link-button/link-button.component';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-company-page-home',
    standalone: true,
    imports: [CommonModule, LinkButtonComponent],
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
        <div
            *ngIf="companyService.company"
            class="flex"
        >
            <app-link-button
                [path]="'/company/'+companyService.company.name+'/employees'"
                title="Company Employees"
            />
            <app-link-button
                [path]="'/company/'+companyService.company.name+'/create-invite-link'"
                title="Create Invite Link"
                class="ms-3"
            />
        </div>
    `
})
export class CompanyPageHomeComponent {

    constructor(public companyService: CompanyService) {}
}
