import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CompanyService } from '../company.service';


@Component({
    selector: 'app-company-router-outlet',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <router-outlet />
    `
})
export class CompanyRouterOutletComponent implements OnInit {

    constructor(
        private companyService: CompanyService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.companyService.getCompaniesData()
        this.route.params.subscribe(params => {
            console.log("Company Name: ", params["companyName"])
        })
    }

}
