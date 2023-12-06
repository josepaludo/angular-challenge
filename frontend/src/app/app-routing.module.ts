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
import { EmployeePageComponent } from './company/employee/employee-page/employee-page.component';
import { EmployeePageHomeComponent } from './company/employee/employee-page-home/employee-page-home.component';
import { CreateInviteLinkComponent } from './company/create-invite-link/create-invite-link.component';
import { JoinViaLinkHomeComponent } from './join-via-link-home/join-via-link-home.component';
import { ManageEmployeesComponent } from './company/manage-employees/manage-employees.component';
import { ManageComponent } from './company/employee/manage/manage.component';
import { DeleteCompanyComponent } from './company/delete-company/delete-company.component';


const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sync-db', component: SyncdbComponent },
    { path: 'profile', component: ProfileComponent },

    { path: 'join-company/:companyName/:inviteLink', component: JoinViaLinkHomeComponent },

    { path: 'companies-home', component: CompanyHomeComponent },
    { path: 'companies-list', component: CompaniesListComponent },
    { path: 'company-create', component: CreateCompanyComponent },

    {
        path: 'company/:companyName',
        component: CompanyPageComponent,
        children: [
            { path: 'home', component: CompanyPageHomeComponent },
            { path: 'delete-company', component: DeleteCompanyComponent },
            { path: 'create-invite-link', component: CreateInviteLinkComponent },
            { path: 'manage-employees', component: ManageEmployeesComponent },
            { path: 'employees', component: EmployeesComponent },

            {
                path: 'employee/:employeeName',
                component: EmployeePageComponent,
                children: [
                    { path: 'home', component: EmployeePageHomeComponent },
                    { path: 'manage', component: ManageComponent }
                ]
            }
        ]
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
