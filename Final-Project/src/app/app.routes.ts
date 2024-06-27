import { Routes } from '@angular/router';
import { ParkListComponent } from './components/park-list/park-list.component';
import { MapsComponent } from './components/maps/maps.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

export const routes: Routes = [
    {path: '', redirectTo: '/park-list', pathMatch: 'full'}
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule)
    ]
});
