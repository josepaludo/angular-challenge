import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import { CompanyService } from '../../company.service';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { EmployeeService } from '../employee.service';
import { ManageEmployeeActions } from 'src/types';
import { Router } from '@angular/router';


@Component({
    selector: 'app-manage',
    standalone: true,
    imports: [CommonModule, GridComponent, WarningComponent, ButtonComponent],
    template: `
        <h1 class="text-2xl mb-5">
            Menage Employee
        </h1>

        <ng-container
            *ngIf="
                companyService.company &&
                employeeService.employee &&
                companyService.isAdminAuthorized() &&
                !employeeService.employeeIsFounder()
            "
        >
            <h2 class="text-xl mb-3 font-semibold">
                Admin Authorized
            </h2>
            <app-grid>
                <app-button
                    title="Promote to Admin"
                    [disabled]="loading"
                    (onClick)="manageEmployee('promote')"
                    class="h-full w-full"
                />
                <app-button
                    title="Remove from Company"
                    [disabled]="loading"
                    (onClick)="manageEmployee('remove')"
                    class="h-full w-full"
                />
            </app-grid>

            <h2
                *ngIf="companyService.isFounderAuthorized()"
                class="text-xl my-3 text-amber-500 font-semibold"
            >
                Founder Authorized
            </h2>
            <app-grid
                *ngIf="companyService.isFounderAuthorized()"
            >
                <app-button
                    title="Demote to Staff"
                    [disabled]="loading"
                    (onClick)="manageEmployee('demote')"
                    class="h-full w-full"
                />
            </app-grid>
        </ng-container>

        <h2 *ngIf="!employeeService.employee || !companyService.company">
            Loading...
        </h2>

        <app-warning
            *ngIf="employeeService.employeeIsFounder()"
            message="Cannot change status of founder"
            color="amber"
            class="my-3"
        />
    
        <app-warning
            *ngIf="companyService.company && !companyService.isAdminAuthorized()"
            message="Unauthorized"
            color="red"
            class="mt-3"
        />
    `
})
export class ManageComponent {

    loading = false

    constructor(
        public companyService: CompanyService,
        public employeeService: EmployeeService,
        public router: Router
    ) {}

    async manageEmployee(action: ManageEmployeeActions) {
        if (this.loading || !this.employeeService.employee) return
        this.loading = true
    
        const {data, status} = await this.employeeService.manageEmployee(action)
    
        this.loading = false
        if (status !== 200) return

        this.employeeService.updateOrRemoveEmployee(action)
        if (action === "remove") {
            const companyName = this.companyService.company!.name
            this.router.navigate(['/company/'+companyName+'/home'])
        }
    }
}
