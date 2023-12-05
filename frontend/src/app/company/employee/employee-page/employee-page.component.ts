import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Position } from 'src/types';


@Component({
    selector: 'app-employee-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <h1
            class="text-3xl mb-10"
            *ngIf="!employeeService.employee; else notLoading"
        >
            Loading Employee...
        </h1>
        <ng-template #notLoading>
            <h1 class="text-3xl mb-10">
                {{employeeService.employee!.name}}
                <span
                    class="ms-3 text-2xl font-semibold"
                    [ngClass]="{'text-amber-500': employeeService.employee!.position === position.founder}"
                >
                    {{employeeService.employee!.position}}
                </span>
            </h1>
            <router-outlet />
        </ng-template>
    `
})
export class EmployeePageComponent implements OnInit {

    position = Position

    constructor(
        public employeeService: EmployeeService,
        private router: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.router.params.subscribe(params => {
            const employeeName = params["employeeName"]
            this.employeeService.updateEmployee({employeeName, count: 0})
        })
    }
}
