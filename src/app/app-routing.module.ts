import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { CyptolandingComponent } from './cyptolanding/cyptolanding.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { LoginComponent } from './login/login.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { RegisterCandidateComponent } from './pages/register/register-candidate/register-candidate.component';
import { RegisterPromoterComponent } from './pages/register/register-promoter/register-promoter.component';
import { ProfileComponent } from './pages/contacts/profile/profile.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { EnterpriseDashboardComponent } from './pages/enterprise-dashboard/enterprise-dashboard.component';
import { BusinessDevDashboardComponent } from './pages/bizdev/business-dev-dashboard/business-dev-dashboard.component';
import { EnterpriseManagementComponent } from './pages/enterprise-management/enterprise-management.component';

const routes: Routes = [
  { path: '', component: CyptolandingComponent },
  { path: 'landing', component: CyptolandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-candidate', component: RegisterCandidateComponent },
  { path: 'register-promoter', component: RegisterPromoterComponent },

  { path: 'activate-account', component: ActivateAccountComponent },

 



  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'backend', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), },
  { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] },
  
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
