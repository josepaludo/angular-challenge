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
            *ngIf="companyService.company"
        >
            {{companyService.company.name}}
        </h1>
        <h1 *ngIf="!companyService.company">
            Company not found
        </h1>
        <router-outlet></router-outlet>
    `
})
export class CompanyPageComponent implements OnInit {

    companyName = ""

    constructor(
        private route: ActivatedRoute,
        public companyService: CompanyService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.companyName = params["companyName"]
        })
        this.companyService.companiesChanged.subscribe(companies => {
            this.companyService.company = companies.find(
                comp => comp.name === this.companyName
            )
        })
    }

}
