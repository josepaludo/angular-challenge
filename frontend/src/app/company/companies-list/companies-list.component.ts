import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../company.service';
import { CardComponent } from 'src/app/components/card/card.component';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-companies-list',
    standalone: true,
    imports: [CommonModule, CardComponent, RouterModule],
    template: `
        <h1 class="text-4xl mb-10">Companies</h1>

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
export class CompaniesListComponent {

    constructor(public companyService: CompanyService) {}
}
