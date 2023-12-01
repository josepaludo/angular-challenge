import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <h1 class="text-4xl mb-5">Login</h1>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
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
                formControlName="password"
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
export class LoginComponent {

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })

    loading = false

    constructor(public auth: AuthService) {}

    async onSubmit() {
        if (this.loading) return
        const {email, password} = this.loginForm.value
        if (email?.trim() === "" || password?.trim() === "") {
            return
        }
        // this.loading = true
        /* @ts-expect-error */ 
        const {data, status} = await this.auth.login({email, password})
        console.log("Data: ", data)
        console.log("Status: ", status)
    }
}
