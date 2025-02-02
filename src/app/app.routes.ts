import { Routes } from '@angular/router';
import { MainComponent } from './components/layouts/main/main.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'setup/bank-entry',
        component: HomeComponent
      },
    ],
  }
];
