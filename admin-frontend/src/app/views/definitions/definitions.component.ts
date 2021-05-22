import { Component, OnInit } from '@angular/core';

import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;

@Component({
	selector: 'app-definitions',
	templateUrl: './definitions.component.html',
	styleUrls: ['./definitions.component.scss']
})
export class DefinitionsComponent implements OnInit {

	name = 'Definitions';

	records: any = [];

	constructor(private konnex: KonnexService) { }

	ngOnInit() {
		this.getRecords();
	}

	getRecords() {
		this.konnex.readDefinitions().subscribe((res: any) => {
			if (res.success) {
				this.records = res.result;
			}
		});
	}

	createRecord() {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Key" id="def-key"/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Definition" id="def-value"/>';

		alertify.confirm('Create a new Definition', html, () => {
			var data: any = {}
			if ($('#def-key').val() == '') {
				return alertify.error("Key cannot be empty");
			}
			if ($('#def-value').val() == '') {
				return alertify.error("Definition cannot be empty");
			}
			data['value'] = $('#def-value').val();
			data['key'] = $('#def-key').val();
			this.konnex.createDefinition(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	deleteRecord(rec: any) {
		var html = 'Are you sure that you want to delete the Defintion?';
		alertify.confirm("Delete Defintion", html, () => {
			this.konnex.deleteDefinition(rec.id).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	updateRecord(rec: any) {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Key" id="edit-def-key" value="' + rec.key + '"/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Definition" id="edit-def-value" value="' + rec.value + '"/>';

		alertify.confirm('Edit Definition', html, () => {
			var data: any = {}
			data['def_id'] = rec.id;
			if ($('#edit-def-key').val() == '') {
				return alertify.error("Key cannot be empty");
			}
			if ($('#edit-def-value').val() == '') {
				return alertify.error("Definition cannot be empty");
			}
			data['key'] = $('#edit-def-key').val();
			data['value'] = $('#edit-def-value').val();

			this.konnex.updateDefinition(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

}
