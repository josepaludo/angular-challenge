import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../company.service';
import { CardComponent } from 'src/app/components/card/card.component';
import { Position } from 'src/types';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { LinkButtonComponent } from 'src/app/components/link-button/link-button.component';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-manage-employees',
    standalone: true,
    imports: [
        CommonModule,
        CardComponent,
        GridComponent,
        LinkButtonComponent,
        WarningComponent,
        RouterModule
    ],
    template: `
        <h2 class="text-3xl mb-10">
            Manage Employees
        </h2>

        <h2
            *ngIf="!companyService.company"
            class="text-2xl"
        >
            Loading...
        </h2>
        <app-warning
            *ngIf="companyService.company && !companyService.isAdminAuthorized()"
            message="Unauthorized"
            color="red"
        />

        <app-grid
            *ngIf="companyService.company && companyService.isAdminAuthorized()"
        >
            <app-card
                *ngFor="let employee of companyService.company.employees"
            >
                <h3 class="text-2xl font-semibold mb-5 mt-3">
                    <a
                        [routerLink]="'../employee/'+employee.name+'/home'"
                        class="hover:text-gray-200"
                    >
                        {{employee.name}}
                    </a>
                </h3>
                <h4 class="text-xl mb-3">
                    Position:
                    <span
                        class="font-semibold"
                        [ngClass]="{'text-amber-500': employee.position === positions.founder}"
                    >
                        {{employee.position}}
                    </span>
                </h4>
                <app-link-button
                    [path]="'../employee/'+employee.name+'/manage'"
                    title="Manage Employee"
                    class="max-w-fit mb-3"
                />
            </app-card>
        </app-grid>
    `
})
export class ManageEmployeesComponent {

    positions = Position

    constructor(public companyService: CompanyService) {}
}
