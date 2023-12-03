import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomeComponent as CompanyHomeComponent } from './company/home/home.component';
import { SyncdbComponent } from './syncdb/syncdb.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sync-db', component: SyncdbComponent },
    { path: 'profile', component: ProfileComponent },
    {
        path: 'company',
        component: CompanyHomeComponent,
        children: [
            { path: "home", component: CompanyHomeComponent },
            { path: "create-company", component: CreateCompanyComponent },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
