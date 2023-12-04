import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../company.service';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterModule } from '@angular/router';
import { LinkButtonComponent } from 'src/app/components/link-button/link-button.component';


@Component({
    selector: 'app-companies-list',
    standalone: true,
    imports: [CommonModule, CardComponent, RouterModule, LinkButtonComponent],
    template: `
        <h1 class="text-4xl mb-10">Companies</h1>

        <h2
            class="text-2xl"
            *ngIf="companyService.loading || !companyService.companies; else didLoad"
        >
            Loading...
        </h2>

        <ng-template #didLoad>
            <div *ngIf="companyService.companies!.length === 0">
                <h2 class="text-2xl mb-5">
                    You don't have an employee profile on any company. 
                </h2>
                <p class="mb-5 text-lg">
                    You can create a company or ask your company administrator for an invite link.
                </p>
                <app-link-button
                    path="/company-create"
                    title="Create a Company"
                />
            </div>
        </ng-template>
    
        <ul class="grid grid-cols-3 gap-1">
            <app-card
                *ngFor="let company of this.companyService.companies"
            >
                <h2 class="text-xl font-semibold mb-3">
                    <a [routerLink]="'/company/'+company.name+'/home'">
                        {{company.name}}
                    </a>
                </h2>

                <p class="px-4 italic">
                    {{company.description}}
                </p>

                <p class="text-end font-light my-3">
                    Employees:
                    <span class="font-semibold">
                        {{company.employees.length}}
                    </span>
                </p>
                <p>
                    Your employee profile: 
                    <span class="font-semibold">
                        {{company.employee.name}}
                    </span>
                </p>
                <p>
                    Your position: 
                    <span class="font-semibold">
                        {{company.employee.position}}
                    </span>
                </p>
            </app-card>
        </ul>
    `
})
export class CompaniesListComponent implements OnInit {

    constructor(public companyService: CompanyService) {}

    ngOnInit() {
        const isNotLoading = !this.companyService.loading
        const didNotFetchData = !this.companyService.companies
        if (isNotLoading && didNotFetchData) {
            this.companyService.getCompaniesData({force: false})
        }
    }
}
