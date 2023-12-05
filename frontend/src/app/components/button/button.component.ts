import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button
            (click)="handleClick()"
            [type]="type"
            [disabled]="disabled"
            class="px-4 py-2 rounded-sm text-lg font-semibold"
            [class]="class"
            [ngClass]="{
                'text-blue-50 bg-blue-500 hover:bg-blue-400': color === 'blue' && !disabled,
                'text-red-50 bg-red-500 hover:bg-red-400': color === 'red' && !disabled,
                'bg-gray-500 text-gray-50 cursor-not-allowed': disabled,
            }"
        >
            {{title}}
        </button>
    `
})
export class ButtonComponent {

    @Output() onClick: EventEmitter<any> = new EventEmitter()
    @Input() title = ""
    @Input() type: "button"|"submit" = "button"
    @Input() class = ""
    @Input() color: "blue"|"red" = "blue"
    @Input() disabled: boolean = false

    handleClick() {
        this.onClick.emit()
    }
}
