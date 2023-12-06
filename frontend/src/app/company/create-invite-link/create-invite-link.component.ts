import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CompanyService } from '../company.service';
import { CardComponent } from 'src/app/components/card/card.component';
import { InviteLinkButtonComponent } from './invite-link-button/invite-link-button.component';
import { GridComponent } from 'src/app/components/grid/grid.component';


@Component({
    selector: 'app-create-invite-link',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        InviteLinkButtonComponent,
        GridComponent
    ],
    template: `
        <h1 class="text-3xl">
            Create Invite Link
        </h1>
        <div class="flex justify-end my-5">
            <p class=" max-w-lg font-light text-end">
                Invite Links can only be used one time. Once an employee joins the company with an Invite Link, its code/id is no longer acceptable 
            </p>
        </div>

        <div
            *ngIf="companyService.company!.inviteLinks.length > 0"
            class="mb-5"
        >
            <h2 class="text-xl mb-5">
                Click on one of the Invite Links bellows to copy the link to your clipboard
            </h2>
            <app-grid>
                <app-invite-link-button
                    *ngFor="let link of companyService.company!.inviteLinks"
                    [companyName]="companyService.company!.name"
                    [link]="link"
                />
            </app-grid>
        </div>
        <h2 class="text-xl mb-5">
            Click the button bellow to create an Invite Link
        </h2>
        <app-button
            (onClick)="handleClick()"
            [disabled]="loading"
            title="Create Invite Link"
        />
    `
})
export class CreateInviteLinkComponent {

    loading = false

    constructor(public companyService: CompanyService) {}

    async handleClick() {
        if (this.loading) return
        this.loading = true
        const {status, data} = await this.companyService.createInviteLink()
        this.loading = false
    }
}
