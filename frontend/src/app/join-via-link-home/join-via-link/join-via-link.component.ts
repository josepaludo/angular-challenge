import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../company/company.service';
import { WarningComponent } from '../../components/warning/warning.component';
import { WarningPropsType } from 'src/types';


@Component({
    selector: 'app-join-via-link',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent, WarningComponent],
    template: `
        <h1 class="text-4xl mb-10">
            Join
                <span class="font-semibold">
                    {{companyName}}
                </span>
            via Invite Link
        </h1>
        <h2 class="text-xl mb-5">
            {{link}}
        </h2>  
        <form [formGroup]="form" (ngSubmit)="handleSubmit()">
            <label
                for="name"
                class="mb-5 text-2xl block"
            >
                Choose a name that will be displayed to other employees on the company
            </label>
            <input
                class=" py-1 px-3 block rounded-sm border outline-none border-stone-900 mb-3"
                formControlName="name"
                placeholder="Display Name"
                id="name"
            />
            <app-button
                type="submit"
                title="Join Company"
                [disabled]="loading"
            />
        </form>
        <app-warning
            *ngIf="warning.show"
            class="mt-5"
            [message]="warning.message"
            [color]="warning.color"
        />
    `
})
export class JoinViaLinkComponent implements OnInit {

    form = new FormGroup({
        name: new FormControl('')
    })
    link: string|undefined
    companyName: string|undefined
    loading = false
    warning: WarningPropsType = {
        show: false,
        message: "",
        color: "green"
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private companyService: CompanyService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.link = params["inviteLink"]
            this.companyName = params["companyName"]
        })
    }

    async handleSubmit() {
        if (this.loading) return
        const {name} = this.form.value
        if (!name || name.trim() === "") return

        this.loading = true
        const {status, data} = await this.companyService.joinViaLink(
            {inviteLink: this.link!, name}
        )
        if (status !== 200) {
            this.warning = {
                show: true,
                message: "Error trying to join company. Contact you Company's administrator to get another invite link.",
                color: "red"
            }
            return
        } 
        this.warning = {
            show: true,
            message: "Joined company. You'll be redirected to the Company's page",
            color: "green"
        }
        const url = `/company/${this.companyName}/home`
        setTimeout(() => this.router.navigate([url]), 2000)
    }
}
