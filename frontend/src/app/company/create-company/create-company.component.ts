import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inputClass } from 'src/constants';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-create-company',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
    template: `
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
    `
})
export class CreateCompanyComponent {

    classes = inputClass
    disabled = false

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

        const {name, description, displayName} = this.form.value
        const fieldsAreValid = [name, description, displayName].every(field => {
            if (!field || field.trim() === "") return false
            return true
        })
        if (!fieldsAreValid) return
    
        const companyData =  {
            name: name!.trim(),
            description: description!.trim(),
            displayName: displayName!.trim()
        }
        const {data, status} = await this.companyService.createCompany(companyData)
    
        setTimeout(() => this.disabled = false, 2000)
    }
}
