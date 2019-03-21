import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Search } from './components/search.component';
import { Details } from './components/details.component';
import { List } from './components/list.component';
import { Groups } from './components/groups.component';

//import { NotFoundComponent } from './components/not-found.component';
//import { UnauthorizedComponent } from './components/unauthorized.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    
    { path: '', component: Search },
    { path: 'search', component: Search },
    { path: 'details/country', component: Details },
    { path: 'details/country/:id', component: Details },
    { path: 'group', component: Groups },
    { path: 'group/:id', component: Groups },
    { path: 'list/all', component: List },
    { path: 'list/continent/:id', component: List },
    { path: 'list/priority/:id', component: List },
    { path: 'list/visited/:id', component: List },
    { path: 'list/season/:seasonFrom/:seasonTo', component: List },
    
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
			{
                enableTracing: true,
                onSameUrlNavigation: 'reload'
			})],
    exports: [RouterModule]
})

export class AppRoutingModule { }