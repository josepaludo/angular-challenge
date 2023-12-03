import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-link-button',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <a
            class="bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-blue-50 text-lg font-semibold px-4 py-2 rounded-sm block max-w-fit"
            [ngClass]="class"
            [routerLink]="path"
        >
            {{title}}
        </a>
    `
})
export class LinkButtonComponent {

    @Input() path = ""
    @Input() title = ""
    @Input() class = ""
}
