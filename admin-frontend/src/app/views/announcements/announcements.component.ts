import { Component, OnInit } from '@angular/core';

import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;


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
  constructor(private konnex: KonnexService) { }

  ngOnInit() {
		this.getRecords();
	}

	getRecords() {
		this.konnex.readAnnouncement().subscribe((res: any) => {
			if (res.success) {
				this.records = res.result;
			}
		});
	}

	createRecord() {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Description" id="a-description"/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Date-time" id="a-date-time"/>';
    html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="enabled" id="enabled"/>';


		alertify.confirm('Create a new Announcement', html, () => {
			var data: any = {}
			data['description'] = $('#a-description').val();
			data['date_time'] = $('#a-date-time').val();
      data['enabled'] = $('#enabled').val();
			this.konnex.createAnnouncement(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	deleteRecord(rec: any) {
		var html = 'Are you sure that you want to delete the Announcement?';
		alertify.confirm("Delete Announcement", html, () => {
			this.konnex.deleteAnnouncement(rec.id).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	updateRecord(rec: any) {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Description" id="a-description" value="' + rec.description + '" disabled/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Date-time" id="a-date-time" value="' + rec.date_time + '"/>';
    html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="enabled" id="enabled" value="' + rec.is_enabled + '"/>';


		alertify.confirm('Edit User', html, () => {
			var data: any = {}
			data['a-description'] = $('#a-description');
			data['a-date-time'] = $('#a-date-time').val();
			this.konnex.editAnnouncemnent(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}



}
