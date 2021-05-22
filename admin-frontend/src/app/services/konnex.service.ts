import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';

@Injectable({
	providedIn: 'root'
})
export class KonnexService {

	constructor(private http: HttpClient, private config: ConfigService) { }

	createAnnouncement(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'announcements/create', data);
	}
	readAnnouncement() {
		return this.http.get<any>(this.config.BASE_API_URL + "announcements/read");
	}
	deleteAnnouncement(id: number) {
		var params: any = {};
		params['announcement_id'] = id;
		return this.http.post<any>(this.config.BASE_API_URL + 'announcements/delete', params);
	}
	updateAnnouncemnent(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'announcements/update', data);
	}

	readFeedback() {
		return this.http.get<any>(this.config.BASE_API_URL + "feedback/read");
	}
	deleteFeedback(id: number) {
		var params: any = {};
		params['feedback_id'] = id;
		return this.http.post<any>(this.config.BASE_API_URL + 'feedback/delete', params);
	}
	editFeedback(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'feedback/edit', data);
	}

	createTutorial(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'tutorials/create', data);
	}
	readTutorials() {
		return this.http.get<any>(this.config.BASE_API_URL + "tutorials/read");
	}
	deleteTutorial(id: number) {
		var params: any = {};
		params['tutorial_id'] = id;
		return this.http.post<any>(this.config.BASE_API_URL + 'tutorials/delete', params);
	}

	readBugReports() {
		return this.http.get<any>(this.config.BASE_API_URL + "bugreports/read");
	}
	deleteBugReport(id: number) {
		var params: any = {};
		params['bug_id'] = id;
		return this.http.post<any>(this.config.BASE_API_URL + 'bugreports/delete', params);
	}
	updateBugReport(params: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'bugreports/delete', params);
	}

	createDefinition(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'definitions/create', data);
	}
	readDefinitions() {
		return this.http.get<any>(this.config.BASE_API_URL + "definitions/read");
	}
	updateDefinition(data: any) {
		return this.http.post<any>(this.config.BASE_API_URL + 'definitions/update', data);
	}
	deleteDefinition(id: number) {
		var params: any = {};
		params['def_id'] = id;
		return this.http.post<any>(this.config.BASE_API_URL + 'definitions/delete', params);
	}

}
