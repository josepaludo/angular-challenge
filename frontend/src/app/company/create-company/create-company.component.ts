import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inputClass } from 'src/constants';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import { WarningPropsType } from 'src/types';


@Component({
    selector: 'app-create-company',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent, WarningComponent],
    template: `
        <h1 class="text-4xl mb-10">
            Create Company
        </h1>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <input
                [ngClass]="classes"
                placeholder="Company Name"
                formControlName="name"
            />
            <div class="flex my-3 items-center">
                <input
                    [ngClass]="classes"
                    placeholder="Display Name"
                    formControlName="displayName"
                    id="display_name"
                />
                <label for="display_name" class="text-lg ms-2">
                    The name displayed for others on the company
                </label>
            </div>
            <textarea
                class=" w-full rounded-sm border border-stone-900 max-w-screen-sm resize-none px-4 py-2 block my-3"
                placeholder="Description"
                formControlName="description"
                rows="10"
            ></textarea>
            <app-button
                type="submit"
                title="Create"
                [disabled]="disabled"
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
export class CreateCompanyComponent {

    classes = inputClass
    disabled = false
    warning: WarningPropsType = {
        show: false,
        message: "",
        color: "green"
    }

    form = new FormGroup({
        name: new FormControl(''),
        description: new FormControl(''),
        displayName: new FormControl('')
    })

    constructor(
        private companyService: CompanyService,
        private router: Router
    ) {}

    async onSubmit() {
        if (this.disabled) return
        this.disabled = true

        const companyData = this.companyDataOrFieldsAreInvalid()
        if (!companyData) return

        const {status} = await this.companyService.createCompany(companyData)
        this.handleResponse({status, name: companyData.name})
    }

    companyDataOrFieldsAreInvalid() {
        const {name, description, displayName} = this.form.value
        const fieldsAreValid = [name, description, displayName].every(field => {
            if (!field || field.trim() === "") return false
            return true
        })
        if (!fieldsAreValid) {
            this.warning = {
                show: false,
                message: "Invalid inputs.",
                color: "amber"
            }
            return null
        }
        const companyData =  {
            name: name!.trim(),
            description: description!.trim(),
            displayName: displayName!.trim()
        }
        return companyData
    }

    handleResponse({status, name}: {status: number, name: string}) {
        if (status !== 200 && status !== 201) {
            this.warning = {
                show: true,
                message: "Error trying to create Company.",
                color: "red"
            }
            return
        }
        this.companyService.getCompaniesData({force: true})
        this.warning = {
            show: true,
            message: `Success. You'll be redirected to the ${name} Company page.`,
            color: "green"
        }
        setTimeout(() => this.router.navigate([`/company/${name}/home`]), 2000)
    }
}
