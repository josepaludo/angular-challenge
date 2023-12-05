import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [CommonModule],
    template: `
        <ul
            class="grid"
            [ngClass]="{
                gap: gap,
                cols: cols,
                'gap-1': !gap,
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': !cols,
            }"
        >
            <ng-content />
        </ul>
    `
})
export class GridComponent {

    @Input() gap: string|undefined
    @Input() cols: string|undefined
}
