import { Component, OnInit } from '@angular/core';

import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;

@Component({
	selector: 'app-tutorials',
	templateUrl: './tutorials.component.html',
	styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {

	name = "Tutorials"

	records: any = [];

	constructor(private konnex: KonnexService) { }

	ngOnInit() {
		this.getRecords();
	}

	getRecords() {
		this.konnex.readTutorials().subscribe((res: any) => {
			if (res.success) {
				this.records = res.result;
			}
		});
	}

	createRecord() {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Key" id="a-intent"/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Description" id="a-description"/>';
		html += '';

		alertify.confirm('Create a new Tutorial', html, () => {
			var data: any = {}
			if ($('#a-intent').val() == '') {
				return alertify.error("Key cannot be empty");
			}
			if ($('#a-description').val() == '') {
				return alertify.error("Description cannot be empty");
			}
			data['description'] = $('#a-description').val();
			data['intent'] = $('#a-intent').val();
			data['steps'] = JSON.stringify({});
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
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Title" id="edit-a-title" value="' + rec.title + '"/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Description" id="edit-a-description" value="' + rec.description + '"/>';

		html += '<div class="text-center w-full my-2 p-2"><label><input type="checkbox" class="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500" id="edit-a-enabled"';
		if (rec.is_enabled) {
			html += 'checked';
		}
		html += '><span class="ml-2">Enable the announcement</span></label></div>';

		alertify.confirm('Edit Announcement', html, () => {
			var data: any = {}
			data['announcement_id'] = rec.id;
			if ($('#edit-a-title').val() == '') {
				return alertify.error("Title cannot be empty");
			}
			if ($('#edit-a-description').val() == '') {
				return alertify.error("Description cannot be empty");
			}
			data['description'] = $('#edit-a-description').val();
			data['title'] = $('#edit-a-title').val();
			data['is_enabled'] = $('#edit-a-enabled:checked').length > 0;

			this.konnex.updateAnnouncemnent(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

}
