import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyService } from '../company.service';
import { CardComponent } from 'src/app/components/card/card.component';


@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [CommonModule, CardComponent, RouterModule],
    template: `
        <ul
            *ngIf="companyService.company && companyService.company.employees"
            class="grid grid-cols-3 grid-gap-1"
        >
            <app-card *ngFor="let employee of companyService.company.employees">
                <h1 class="text-2xl font-semibold mb-3">
                    {{employee.name}}
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
        </ul>
    `
})
export class EmployeesComponent {

    constructor(public companyService: CompanyService) {}
}
