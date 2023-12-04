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
                'bg-red-500 border-red-600 text-red-100': color === 'red', 
                'bg-amber-500 border-amber-600 text-amber-100': color === 'amber', 
                'bg-green-500 border-green-600 text-green-100': color === 'green', 
            }"
            [class]="class"
        >
            {{message}}
        </div>
    `
})
export class WarningComponent {

    @Input() color: "red"|"green"|"amber" = "amber"
    @Input() message: string = ""
    @Input() class: string = ""
}
