import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Events } from './components/events/events';
import { Contact } from './components/contact/contact';
import { Activities } from './components/activities/activities';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'events', component: Events },
  { path: 'contact', component: Contact },
  { path: 'activities', component: Activities }
];
