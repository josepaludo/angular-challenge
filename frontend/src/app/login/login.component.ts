import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { WarningComponent } from '../components/warning/warning.component';
import { WarningPropsType } from 'src/types';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, WarningComponent],
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
        <app-warning
            *ngIf="warning.show"
            class="mt-5"
            [message]="warning.message"
            [color]="warning.color"
        />
    `
})
export class LoginComponent {

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })
    loading = false
    warning: WarningPropsType = {
        show: false,
        message: "",
        color: "green"
    }

    constructor(
        public auth: AuthService,
        private router: Router
    ) {}

    async onSubmit() {
        if (this.loading) return
        const {email, password} = this.loginForm.value
        if (
            (!email || !password) ||
            (email.trim() === "" || password.trim() === "")
        ) {
            this.warning = {
                show: true,
                color: 'amber',
                message: "Wrong inputs."
            }
            return
        }

        this.loading = true
        const {data, status} = await this.auth.login({email, password})
        console.log("Data: ", data)
        console.log("Status: ", status)
        if (status === 200) {
            this.warning = {
                show: true,
                message: "Logged in. You'll be redirected to the main page.",
                color: "green"
            }
            setTimeout(() => this.router.navigate(['/']), 2000)
        } else {
            this.warning = {
                show: true,
                message: "Login failed.",
                color: "red"
            }
            this.loading = false
        }
    }
}
