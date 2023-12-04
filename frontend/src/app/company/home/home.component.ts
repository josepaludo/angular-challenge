import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from 'src/app/components/link-button/link-button.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, LinkButtonComponent],
    template: `
        <div class="flex">
            <app-link-button
                path="/company-create"
                title="Create Company"
            />
            <app-link-button
                path="/companies-list"
                title="List of Companies"
                class="ms-3"
            />
        </div>
    `
})
export class HomeComponent {

}
