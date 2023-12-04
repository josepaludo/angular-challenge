import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

    ngOnInit() {
        this.companyService.getCompaniesData()
    }

    constructor(private companyService: CompanyService) {}
}
