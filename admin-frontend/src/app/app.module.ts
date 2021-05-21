import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TokenInterceptor } from './helpers/token.interceptor';
import { GlobalErrorHandler } from './helpers/error-handler';
import { EncodeHttpParamsInterceptor } from './helpers/encoder.interceptor';

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
import { ChatlistComponent } from './views/chatlist/chatlist.component';

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
		SidebarNavComponent,
    ChatlistComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: EncodeHttpParamsInterceptor,
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
