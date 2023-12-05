import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';


@Component({
    selector: 'app-invite-link-button',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    template: `
        <li
            (click)="handleClick()"
            class=" text-white rounded-sm px-4 py-2 font-semibold text-lg overflow-hidden w-full h-full "
            [ngClass]="{
                'bg-gray-500 cursor-not-allowed': clicked,
                'bg-blue-500 hover:bg-blue-400 cursor-pointer': !clicked
            }"
        >
            {{clicked ? 'Link Copied to Clipboard' : link }}
        </li>
    `
})
export class InviteLinkButtonComponent {

    @Input() link = ""
    @Input() companyName = ""

    clicked = false

    handleClick() {
        console.log("He")
        if (this.clicked) return
        this.clicked = true
        const url = 'http://localhost:4200/join-company/'
        navigator.clipboard.writeText(url+this.companyName+'/'+this.link)
        setTimeout(() => this.clicked = false, 1000)
    }
}
