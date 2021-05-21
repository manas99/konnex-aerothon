import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';
@Injectable({
  providedIn: 'root'
})
export class KonnexService {

  	constructor(private http: HttpClient, private config: ConfigService) { }

    createAnnouncement(data: any) {
      return this.http.post<any>(this.config.BASE_API_URL + 'announcement/create', data);
    }

    readAnnouncement() {
      return this.http.get<any>(this.config.BASE_API_URL + "announcement/read");
    }

    deleteAnnouncement(id: number) {
      var params: any = {};
      params['announcement_id'] = id;
      return this.http.post<any>(this.config.BASE_API_URL + 'announcement/delete', params);
    }

    editAnnouncemnent(data: any) {
      return this.http.post<any>(this.config.BASE_API_URL + 'announcement/edit', data);
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

}
