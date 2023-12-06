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
            *ngIf="companyService.loading; else loaded"
        >
            Loading...
        </h1>
        <ng-template #loaded>
            <h1
                class="text-4xl mb-10"
                *ngIf="companyService.company"
            >
                <a
                    [routerLink]="'/company/'+companyService.company.name+'/home'"
                    class="hover:text-gray-700"
                >
                    {{companyService.company.name}}
                </a>
                <span class="ms-5 text-2xl italic font-light">
                    Company
                </span>
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
        this.companyService.getCompaniesData({force: false})
        this.route.params.subscribe(params => {
            const name = params["companyName"] as string|undefined
            if (!name) {
                console.log("Error on company page component: companyName is: ", name)
            }
            this.companyService.setCompany({name, count: 0})
        })
    }
}
