import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { CardManagementComponent } from './card-management/card-management.component';
import { BusinessDevDashboardComponent } from './bizdev/business-dev-dashboard/business-dev-dashboard.component';
import { EnterpriseDashboardComponent } from './enterprise-dashboard/enterprise-dashboard.component';
import { EnterpriseManagementComponent } from './enterprise-management/enterprise-management.component';
import { ProfileComponent } from './common/profile/profile.component';
import { LeadComponent } from './bizdev/lead/lead.component';
import { ActivityComponent } from './bizdev/activity/activity.component';
import { FollowupComponent } from './bizdev/followup/followup.component';
import { FollowupDetailsComponent } from './bizdev/followup/single-follow-up-details/followup-details/followup-details.component';
import { HelpSupportInquiryComponent } from './common/help-support-inquiry/help-support-inquiry.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  { path: 'backend', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },

  { path: 'card-management', component: CardManagementComponent },

 //core
 { path: 'enterprise-management', component: EnterpriseManagementComponent },
 { path: 'enterprise-dashboard', component: EnterpriseDashboardComponent },

 //bizdev
 { path: 'business-dev-dashboard', component: BusinessDevDashboardComponent },
 { path: 'activity-management', component: ActivityComponent },
 { path: 'bizdev-leads', component: LeadComponent },
 { path: 'follow-ups', component: FollowupComponent },
 { path: 'follow-up-details', component: FollowupDetailsComponent },



 //common
 { path: 'profile', component: ProfileComponent },

 { path: 'help-and-support', component: HelpSupportInquiryComponent },



  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'filemanager', component: FilemanagerComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
