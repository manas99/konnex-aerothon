import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Login } from './login/login.component';
// import { Announcements } from '/announcements/announcements.component';
// import { AppSupport } from '/app-support/app-support.component';
// import { BugReport } from '/bug-report/bug-report.component';
import { ChatComponent } from './chat/chat.component';
// import { Dashboard } from '/dashboard/dashboard.component';
// import { Feedback } from '/feedback/feedback.component';
// import { UserManagement } from '/user-management/user-management.component';


const routes: Routes = [

  // {path:'announcements', component: AnnouncementsComponent},
  // {path:'', component: DashboardComponent },
  // {path:'login', component: LoginComponent},
  // {path:'announcements', component: AnnouncementsComponent},
  // {path:'appsupport', component: AppSupportComponent},
  // {path:'bugreport', component: BugReportComponent},
  {path:'chat', component: ChatComponent},
  // {path:'dashboard', component: DashboardComponent},
  // {path:'feedback', component: FeedbackComponent},
  // {path:'usermangement', component: UserManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
