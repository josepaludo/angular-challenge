import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <h1 class="text-4xl mb-5">Register</h1>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <input
                class=" py-1 px-3 block rounded-sm border outline-none border-stone-900 my-3 "
                placeholder="Username"
                formControlName="username"
            >
            <input
                class=" py-1 px-3 block rounded-sm border outline-none border-stone-900 my-3 "
                type="email"
                placeholder="E-mail"
                formControlName="email"
            >
            <input
                class=" py-1 px-3 block rounded-sm border outline-none border-stone-900 my-3 "
                type="password"
                placeholder="Password"
                formControlName="password1"
            >
            <input
                class=" py-1 px-3 block rounded-sm border outline-none border-stone-900 my-3 "
                type="password"
                placeholder="Repeat Password"
                formControlName="password2"
            >
            <button
                type="submit"
                class=" bg-blue-500 px-3 py-1 rounded-sm text-stone-100 hover:bg-blue-400"
                [disabled]="loading"
            >
                Login
            </button>
        </form>
    `
})
export class RegisterComponent {

    registerForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        password1: new FormControl(''),
        password2: new FormControl('')
    })

    loading = false

    constructor(public auth: AuthService) {}

    async onSubmit() {
        if (this.loading) return

        const {username, email, password1, password2} = this.registerForm.value
        const validInputs = [username, email, password1, password2].every(
            field => field && field.trim() !== ""
        )
        if (!validInputs) {
            this.loading = false
            return
        }

        /* @ts-expect-error */ 
        const {data, status} = await this.auth.register({username, email, password: password1})
        console.log("Data: ", data)
        console.log("Status: ", status)
    }
}
