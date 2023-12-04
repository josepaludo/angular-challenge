import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../company.service';

@Component({
    selector: 'app-company-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <h1
            class="text-4xl mb-10"
            *ngIf="companyService.loading; else isLoading"
        >
            Loading...
        </h1>
        <ng-template #isLoading>
            <h1
                class="text-4xl mb-10"
                *ngIf="companyService.company"
            >
                {{companyService.company.name}}
            </h1>
            <router-outlet *ngIf="companyService.company" />

            <h1
                *ngIf="!companyService.company"
                class="text-4xl mb-10"
            >
                Company not found
            </h1>
        </ng-template>
    `
})
export class CompanyPageComponent implements OnInit {

    constructor(
        public companyService: CompanyService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.companyService.getCompaniesData()
        this.route.params.subscribe(params => {
            const name = params["companyName"]
            this.companyService.setCompany(name)
        })
    }
}
