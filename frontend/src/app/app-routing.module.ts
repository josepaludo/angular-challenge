import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomeComponent as CompanyHomeComponent } from './company/home/home.component';
import { SyncdbComponent } from './syncdb/syncdb.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateCompanyComponent } from './company/create-company/create-company.component';
import { CompanyRouterOutletComponent } from './company/company-router-outlet/company-router-outlet.component';
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
    {
        path: 'company',
        component: CompanyRouterOutletComponent,
        children: [
            { path: 'home', component: CompanyHomeComponent },
            { path: 'create', component: CreateCompanyComponent },
            { path: 'list', component: CompaniesListComponent },
            {
                path: ':companyName',
                component: CompanyPageComponent,
                children: [
                    { path: 'employees', component: EmployeesComponent },
                    { path: 'home', component: CompanyPageHomeComponent },
                ]
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
