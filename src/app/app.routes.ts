import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Activities } from './components/activities/activities';
import { Reviews } from './components/reviews/reviews';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'activities', component: Activities },
  { path: 'reviews', component: Reviews }
];
