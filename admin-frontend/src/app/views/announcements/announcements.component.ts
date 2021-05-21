import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  records = [{id: 1, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020", is_enabled: true},
             {id: 2, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020", is_enabled: true},
             {id: 3, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020", is_enabled: true},
             {id: 4, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020", is_enabled: true},]
  constructor() { }

  ngOnInit(): void {
  }



}
