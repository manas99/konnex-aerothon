import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { SidebarNavComponent } from './layouts/sidebar-nav/sidebar-nav.component';
import { FullPageComponent } from './layouts/full-page/full-page.component';
import { AnnouncementsComponent } from './views/announcements/announcements.component';
import { TutorialsComponent } from './views/tutorials/tutorials.component';
import { BugReportComponent } from './views/bug-report/bug-report.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { UsersComponent } from './views/users/users.component';
import { LoginComponent } from './views/login/login.component';
import { ChatComponent } from './views/chat/chat.component';
import { FeedbackComponent } from './views/feedback/feedback.component';
import { ChatlistComponent } from './views/chatlist/chatlist.component';


const routes: Routes = [
	{
		path: '',
		component: SidebarNavComponent,
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'announcements', component: AnnouncementsComponent },
			{ path: 'tutorials', component: TutorialsComponent },
			{ path: 'bug-report', component: BugReportComponent },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'users', component: UsersComponent },
			{ path: 'chat', component: ChatComponent },
			{ path: 'feedback', component: FeedbackComponent },
			{ path: 'chatlist', component: ChatlistComponent },
		],
		// canActivate: [AuthGuard]
	},
	{
		path: '',
		component: FullPageComponent,
		children: [
			{ path: 'login', component: LoginComponent },
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
