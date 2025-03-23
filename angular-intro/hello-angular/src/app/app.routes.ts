import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'heroes',
        component: HeroesComponent,
    },
    {
        path: 'hero-details/:id',
        component: HeroDetailsComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/heroes'
    }
];
