import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomeComponent as CompanyHomeComponent } from './company/home/home.component';
import { SyncdbComponent } from './syncdb/syncdb.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { CompaniesListComponent } from './company/companies-list/companies-list.component';
import { CompanyPageComponent } from './company/company-page/company-page.component';
import { EmployeesComponent } from './company/employees/employees.component';
import { CompanyPageHomeComponent } from './company/company-page-home/company-page-home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sync-db', component: SyncdbComponent },
    { path: 'profile', component: ProfileComponent },

    { path: 'companies-home', component: CompanyHomeComponent },
    { path: 'companies-list', component: CompaniesListComponent },
    { path: 'company-create', component: CreateCompanyComponent },
    {
        path: 'company/:companyName',
        component: CompanyPageComponent,
        children: [
            { path: 'home', component: CompanyPageHomeComponent },
            { path: 'employees', component: EmployeesComponent },
        ]
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
