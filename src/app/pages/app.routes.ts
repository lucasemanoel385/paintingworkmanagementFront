import { Routes } from '@angular/router';
import { RegisterWorkComponent } from '../features/componentsWork/register-work/register-work.component';
import { ListEmployeeComponent } from '../features/componentsEmployee/list-employee/list-employee.component';
import { ListPresenceComponent } from '../features/componentsPresence/list-presence/list-presence.component';
import { ListRoleComponent } from '../features/componentsRole/list-role/list-role.component';
import { ReportComponent } from '../features/componentsWork/report/report.component';
import { ListWorkComponent } from '../features/componentsWork/list-work/list-work.component';
import { ListExpenseComponent } from '../features/componentsExpense/list-expense/list-expense.component';

export const routesInSpa: Routes = [

    {
        path:'register-work',
        component: RegisterWorkComponent
    },
    {
        path:'list-work',
        component: ListWorkComponent
    },
    {
        path:'work/:id',
        component: RegisterWorkComponent
    },
    {
        path:'work/report/:id',
        component: ReportComponent
    },
    {
        path:'list-employee',
        component: ListEmployeeComponent
    },
    {
        path:'list-presence',
        component: ListPresenceComponent
    },
    {
        path:'list-role',
        component: ListRoleComponent
    },
    {
        path:'list-expense',
        component: ListExpenseComponent
    }

];
