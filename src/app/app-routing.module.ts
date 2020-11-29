import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { Shell } from './shell/shell.service';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

const childRoutes: Routes = [Shell.childRoutes([{ path: 'login', component: LoginComponent }])];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppShellRoutingModule {}
