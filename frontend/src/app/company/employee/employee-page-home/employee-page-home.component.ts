import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { LinkButtonComponent } from 'src/app/components/link-button/link-button.component';

@Component({
    selector: 'app-employee-page-home',
    standalone: true,
    imports: [CommonModule, GridComponent, LinkButtonComponent],
    template: `
        <app-grid>
            <app-link-button
                title="Manage Employee"
                path="../manage"
            />
        </app-grid>
    `
})
export class EmployeePageHomeComponent {
}
