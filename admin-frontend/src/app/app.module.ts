import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { ChatComponent } from './chat/chat.component';
import { AppSupportComponent } from './app-support/app-support.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AnnouncementsComponent,
    UserManagementComponent,
    FeedbackComponent,
    BugReportComponent,
    ChatComponent,
    AppSupportComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
