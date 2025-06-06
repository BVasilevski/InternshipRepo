import { Routes } from '@angular/router';
import { ShowComponent } from './show/show.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'shows',
        component: ShowComponent
    },
    {
        path: 'show-details/:id',
        component: ShowDetailsComponent,
    }
];
