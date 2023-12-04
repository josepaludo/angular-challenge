import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <li
            class="px-5 py-3 rounded-sm shadow bg-stone-800 text-stone-100"
            [ngClass]="class"
        >
            <ng-content />
        </li>
    `
})
export class CardComponent {

    @Input() class = ""
}
