import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Position } from 'src/types';
import { CompanyService } from '../../company.service';


@Component({
    selector: 'app-employee-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <h1
            class="text-3xl mb-10"
            *ngIf="!employeeService.employee; else loaded"
        >
            Loading Employee...
        </h1>
        <ng-template #loaded>
            <h1 class="text-3xl mb-10">
                <a
                    class="hover:text-gray-700"
                    [routerLink]="
                        '/company/'+companyService.company!.name+
                        '/employee/'+employeeService.employee!.name+'/home'
                    "
                >
                    {{employeeService.employee!.name}}
                </a>
                <span
                    class="ms-5 text-2xl font-semibold"
                    [ngClass]="{'text-amber-500': employeeService.employee!.position === position.founder}"
                >
                    {{employeeService.employee!.position}}
                </span>
            </h1>
            <hr class="my-5 border-2">
            <router-outlet />
        </ng-template>
    `
})
export class EmployeePageComponent implements OnInit {

    position = Position

    constructor(
        public employeeService: EmployeeService,
        public companyService: CompanyService,
        private router: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.router.params.subscribe(params => {
            const employeeName = params["employeeName"]
            this.employeeService.updateEmployee({employeeName, count: 0})
        })
    }
}
