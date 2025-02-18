import { Routes } from '@angular/router';
import { MainComponent } from './components/layouts/main/main.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminComponent } from './components/layouts/admin/admin.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { AuthGuard } from './services/auth.guard';
import { NewsListComponent } from './components/pages/news-list/news-list.component';
import { UserListComponent } from './components/pages/user-list/user-list.component';
import { VideoListComponent } from './components/pages/video-list/video-list.component';
import { AllNewsComponent } from './components/pages/all-news/all-news.component';

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
        path: 'news/:category',
        component: AllNewsComponent
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'news-list', pathMatch: 'full' },
      {
        path: 'news-list',
        component: NewsListComponent
      },
      {
        path: 'video-list',
        component: VideoListComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
    ],
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  }
];
