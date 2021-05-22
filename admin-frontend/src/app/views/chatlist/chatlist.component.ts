import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { KonnexService } from '../../services/konnex.service';
import { SocketService } from '../../services/socket.service';

declare let $: any;
declare let alertify: any;
declare let Object: any;

@Component({
	selector: 'app-chatlist',
	templateUrl: './chatlist.component.html',
	styleUrls: ['./chatlist.component.scss']
})
export class ChatlistComponent implements OnInit {

	name = "Connections List"
	active = true;

	records: any = {}
	status = false;

	constructor(private sock_: SocketService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		if (this.route.snapshot.params.query) {
			var query = this.route.snapshot.params.query;
			this.active = false;
			this.getRecords();
		} else {
			this.sock_.createConnection('ws/admin/connections');
			this.sock_.connectionStatus.subscribe((data: any) => {
				this.status = data;
			})
			this.sock_.msgReceived.subscribe((data: any) => {
				this.handleMsg(data)
			})
		}

	}

	getRecords() {
		this.sock_.read().subscribe((res: any) => {
			if (res.success) {
				this.records = res.result;
			}
		});
	}

	deleteRecord(rec: any) {
		var html = 'Are you sure that you want to delete the Connection Record?';
		alertify.confirm("Delete Connection Record", html, () => {
			this.sock_.delete(rec.id).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	updateRecord(rec: any) {
		// var html = '';
		// html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Feedback" id="feedback" value="' + rec.feedback + '" disabled/>';
		// html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Date-time" id="f-date-time" value="' + rec.date_time + '"/>';
		// if (rec.is_active) {
		// 	html += 'checked'
		// }
		// html += '>';
		// html += '<label class="custom-control-label" for="is-active">Is Active</label>';
		// html += '</div>';
		//
		// alertify.confirm('Edit Feedback', html, () => {
		// 	var data: any = {}
		// 	// data['feedback_id'] = rec.id;
		// 	data['feedback'] = $('#feedback').val();
		//
		// 	this.konnex.editFeedback(data).subscribe((res: any) => {
		// 		if (res.success) {
		// 			alertify.success(res.message);
		// 			this.getRecords();
		// 		}
		// 	});
		// }, () => { })
	}

	handleMsg(data: any) {
		console.log(data)
		if (data['action'] == 'active_connections') {
			this.records = data['message']
			return
		}
		if (data['action'] == 'new_connection') {
			this.records[data['message']['client_id']] = data['message']
			return
		}
		if (data['action'] == 'end_connection') {
			delete this.records[data['message']]
			return
		}

	}

	retryConnection() {
		this.sock_.createConnection('ws/admin/connections');
	}

	isObjectEmpty(obj: any) {
		return Object.keys(obj).length === 0;
	}

	showAllConnections() {
		this.sock_.closeActiveConnection()
		this.router.navigate(["/connections-list", "all"]);
		this.ngOnInit();
	}
	showActiveConnections() {
		this.router.navigate(["/connections-list"]);
		this.ngOnInit();
	}


}
