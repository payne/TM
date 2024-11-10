import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'speakers', loadComponent: () => import('./pages/speakers/speakers.component').then(m => m.SpeakersComponent) },
  { path: 'dates', loadComponent: () => import('./pages/meeting-dates/meeting-dates.component').then(m => m.MeetingDatesComponent) }
];
