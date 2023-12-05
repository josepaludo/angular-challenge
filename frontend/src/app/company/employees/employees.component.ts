import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyService } from '../company.service';
import { CardComponent } from 'src/app/components/card/card.component';
import { GridComponent } from 'src/app/components/grid/grid.component';


@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [CommonModule, CardComponent, RouterModule, GridComponent],
    template: `
        <h1 class="text-3xl mb-10">
            Employees
        </h1>
        <app-grid
            *ngIf="companyService.company && companyService.company.employees"
        >
            <app-card *ngFor="let employee of companyService.company.employees">
                <h1 class="text-2xl font-semibold mb-3">
                    <a [routerLink]="'../employee/'+employee.name+'/home'">
                        {{employee.name}}
                    </a>
                </h1>
                <h2>
                    Company:
                    <span class="font-semibold">
                        <a [routerLink]="'/company/'+companyService.company.name+'/home'">
                            {{companyService.company.name}}
                        </a>
                    </span>
                </h2>
                <h2>
                    Position:
                    <span class="font-semibold">
                        {{employee?.position}}
                    </span>
                </h2>
            </app-card>
        </app-grid>
    `
})
export class EmployeesComponent {

    constructor(public companyService: CompanyService) {}
}
