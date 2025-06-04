import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { CryptoModule } from './crypto/crypto.module';
import { EmailModule } from './email/email.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';
import { BlogModule } from "./blog/blog.module";
import { UtilityModule } from './utility/utility.module';
import { UiModule } from './ui/ui.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { CalendarComponent } from './calendar/calendar.component';
import { MapsModule } from './maps/maps.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

import { FilemanagerComponent } from './filemanager/filemanager.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CardManagementComponent } from './card-management/card-management.component';
import { RegisterPromoterComponent } from './register/register-promoter/register-promoter.component';
import { RegisterCandidateComponent } from './register/register-candidate/register-candidate.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EnterpriseManagementComponent } from './enterprise-management/enterprise-management.component';
import { ActivityComponent } from './bizdev/activity/activity.component';
import { LeadComponent } from './bizdev/lead/lead.component';
import { FollowupComponent } from './bizdev/followup/followup.component';
import { FollowupDetailsComponent } from './bizdev/followup/single-follow-up-details/followup-details/followup-details.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreatemeetingmodalComponent } from './bizdev/followup/single-follow-up-details/followup-details/createmeetingmodal/createmeetingmodal.component';
import { HelpSupportInquiryComponent } from './common/help-support-inquiry/help-support-inquiry.component';
import { LeadDetailsComponent } from './bizdev/lead/lead-details/lead-details.component';
import { BizdevProductsComponent } from './bizdev/product-management/bizdev-products/bizdev-products.component';
import { BizdevCategoriesComponent } from './bizdev/product-management/bizdev-categories/bizdev-categories.component';
import { SingleProductDetailsComponent } from './bizdev/product-management/bizdev-products/single-product-details/single-product-details.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CaseManagementComponent } from './bizdev/case/case-management/case-management.component';
import { CaseDetailComponent } from './bizdev/case/case-detail/case-detail.component';
import { ContactFragmentComponent } from './bizdev/lead/lead-fragments/contact-fragment/contact-fragment.component';
import { ProfileFragmentComponent } from './bizdev/lead/lead-fragments/profile-fragment/profile-fragment.component';
import { NoteFragmentComponent } from './bizdev/lead/lead-fragments/note-fragment/note-fragment.component';
import { HistoryFragmentComponent } from './bizdev/lead/lead-fragments/history-fragment/history-fragment.component';



@NgModule({
  declarations: [LeadComponent,CalendarComponent, ChatComponent, FilemanagerComponent,CardManagementComponent, RegisterPromoterComponent, RegisterCandidateComponent, UserManagementComponent, EnterpriseManagementComponent, ActivityComponent, FollowupComponent, FollowupDetailsComponent, CreatemeetingmodalComponent, HelpSupportInquiryComponent, LeadDetailsComponent, BizdevProductsComponent, BizdevCategoriesComponent, SingleProductDetailsComponent, CaseManagementComponent, CaseDetailComponent, ContactFragmentComponent, ProfileFragmentComponent, NoteFragmentComponent, HistoryFragmentComponent],
  imports: [
    CKEditorModule,
    MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatIconModule,
    MatTableExporterModule,
    AccordionModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule, 
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    CryptoModule,
    EcommerceModule,
    EmailModule,
    InvoicesModule,
    HttpClientModule,
    ProjectsModule,
    UIModule,
    TasksModule,
    ContactsModule,
    BlogModule,
    UtilityModule,
    UiModule,
    FormModule,
    TablesModule,
    IconsModule,
    ChartModule,
    WidgetModule,
    MapsModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule
  ],
})
export class PagesModule { }
