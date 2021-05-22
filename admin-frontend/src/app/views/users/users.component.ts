import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

declare let $: any;
declare let alertify: any;
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	name = "Users"

	records: any = [];

	constructor(public auth_: AuthService) { }

	ngOnInit() {
		this.getRecords();
	}

	getRecords() {
		this.auth_.read().subscribe((res: any) => {
			if (res.success) {
				this.records = res.result;
			}
		});
	}

	createRecord() {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Username" id="user-name"/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Full Name" id="full-name"/>';
		html += '<span class="text-sm italic text-gray-500">Note: The default password will be the username</span>';

		alertify.confirm('Create a new User', html, () => {
			var data: any = {}
			data['username'] = $('#user-name').val();
			data['name'] = $('#full-name').val();
			this.auth_.create(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	deleteRecord(rec: any) {
		var html = 'Are you sure that you want to delete the User, ' + rec.name + '?';
		alertify.confirm("Delete User", html, () => {
			this.auth_.delete(rec.id).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	updateRecord(rec: any) {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Username" id="ed-user-name" value="' + rec.username + '" disabled/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Full Name" id="ed-full-name" value="' + rec.name + '"/>';
		html += '<input type="text" class="form-control mb-1" id="new-pass" placeholder="Change Password" />'
		html += '<div class="custom-control custom-checkbox mb-1 text-center">';
		html += '<input type="checkbox" class="custom-control-input" id="is-active" ';
		if (rec.is_active) {
			html += 'checked'
		}
		html += '>';
		html += '<label class="custom-control-label" for="is-active">Is Active</label>';
		html += '</div>';

		alertify.confirm('Edit User', html, () => {
			var data: any = {}
			data['user_id'] = rec.id;
			data['name'] = $('#ed-full-name').val();
			data['is_active'] = $('#is-active').is(':checked') ? 'active' : 'inactive';
			if ($("#new-pass").val() != "") {
				data['new_password'] = $("#new-pass").val()
			}
			this.auth_.edit(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

}
