import { Routes } from '@angular/router';
import { PageSpaComponent } from './pages/page-spa/page-spa.component';

export const routes: Routes = [

    {
        path:'',
        component: PageSpaComponent,
        loadChildren: () => import('./pages/app.routes').then((r) => r.routesInSpa)
    }



];
