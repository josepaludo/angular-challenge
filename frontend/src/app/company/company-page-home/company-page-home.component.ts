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
        <app-link-button
            *ngIf="companyService.company"
            [path]="'/company/'+companyService.company.name+'/employees'"
            title="Company Employees"
        />
    `
})
export class CompanyPageHomeComponent {

    constructor(public companyService: CompanyService) {}
}
