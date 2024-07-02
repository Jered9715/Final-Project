import { Routes } from '@angular/router';
import { ParkListComponent } from './components/park-list/park-list.component';
import { MapsComponent } from './components/maps/maps.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { ParkDetailComponent } from './components/park-detail/park-detail.component';

export const routes: Routes = [
    {path: '', redirectTo: '/park-list', pathMatch: 'full'},
    {path: 'park-list', component: ParkListComponent},
    {path: 'park-detail/:parkCode', component: ParkDetailComponent}
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule)
    ]
});
