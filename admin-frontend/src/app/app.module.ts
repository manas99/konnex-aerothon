import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnouncementsComponent } from './views/announcements/announcements.component';
import { TutorialsComponent } from './views/tutorials/tutorials.component';
import { BugReportComponent } from './views/bug-report/bug-report.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UsersComponent } from './views/users/users.component';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/chat/chat.component';
import { FeedbackComponent } from './views/feedback/feedback.component';
import { FullPageComponent } from './layouts/full-page/full-page.component';
import { SidebarNavComponent } from './layouts/sidebar-nav/sidebar-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncementsComponent,
    TutorialsComponent,
    BugReportComponent,
    DashboardComponent,
    UsersComponent,
    LoginComponent,
    ChatComponent,
    FeedbackComponent,
    FullPageComponent,
    SidebarNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
