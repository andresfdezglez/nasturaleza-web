import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Activities } from './components/activities/activities';

export const routes: Routes = [
  { path: 'activities/avistamiento', component: Activities },
  { path: 'activities/rutas', component: Activities },
  { path: 'activities/fotografia', component: Activities },
  
  // Redirección por si alguien entra a /activities a secas
  { path: 'activities', redirectTo: 'activities/avistamiento', pathMatch: 'full' },
  
  { path: '**', redirectTo: '' }
];
