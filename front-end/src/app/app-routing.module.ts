import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyDashboardComponent } from './components/user_components/my-dashboard/my-dashboard.component';
import { RegisterComponent } from './components/user_components/register/register.component';
import { LoginComponent } from './components/user_components/login/login.component';
import { ProfileComponent } from './components/user_components/profile/profile.component';

import { AuthGuard } from './guards/auth.guard';

import { AdminLoginComponent } from './components/admin_components/admin-login/admin-login.component';

import { BookDashComponent } from './components/admin_components/book-dash/book-dash.component';
import { UserDashComponent } from './components/admin_components/user-dash/user-dash.component';
import { CollectionDashComponent } from './components/user_components/collection-dash/collection-dash.component';
import { BookmarksDashComponent } from './components/user_components/bookmarks-dash/bookmarks-dash.component';

import { AdminGuard } from './guards/admin.guard';
import { DueDashComponent } from './components/user_components/due-dash/due-dash.component';
import { SuggestBookComponent } from './components/user_components/suggest-book/suggest-book.component';
import { NotificationsComponent } from './components/admin_components/notifications/notifications.component';


const routes: Routes = [
  {path: '', component: MyDashboardComponent, canActivate:[AuthGuard]},
  {path: 'collection', component: CollectionDashComponent, canActivate: [AuthGuard]},    
  {path: 'bookmarks', component: BookmarksDashComponent, canActivate: [AuthGuard]},    
  {path: 'dues', component: DueDashComponent, canActivate: [AuthGuard]},
  {path: 'suggest-book', component: SuggestBookComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},  
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},  
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-books', component: BookDashComponent, canActivate:[AdminGuard]},
  {path: 'admin-users', component: UserDashComponent, canActivate:[AdminGuard]},
  {path: 'admin-notices', component: NotificationsComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
