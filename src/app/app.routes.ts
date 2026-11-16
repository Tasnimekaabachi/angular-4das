import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { ConferenceList } from './components/conference-list/conference-list';
import { UnderConstruction } from './pages/under-construction';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'conferences', component: ConferenceList },
  { path: '**', component: UnderConstruction }, // any route without its own page
];
