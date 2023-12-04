import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-employee-page-home',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>Employee Page Home Component</h1>
    `
})
export class EmployeePageHomeComponent {
}
