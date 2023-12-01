import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-warning',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div
            class=" rounded px-5 py-3 font-semibold text-lg border-2 "
            [ngClass]="{
                'bg-red-500 border-red-700 text-red-200': color === 'red', 
                'bg-amber-500 border-amber-700 text-amber-200': color === 'amber', 
                'bg-green-500 border-green-700 text-green-200': color === 'green', 
            }"
        >
            {{message}}
        </div>
    `
})
export class WarningComponent {

    @Input() color: "red"|"green"|"amber" = "amber"
    @Input() message: string = ""
}
