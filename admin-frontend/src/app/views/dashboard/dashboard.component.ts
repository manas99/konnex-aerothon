import { Component, OnInit } from '@angular/core';

import { SocketService } from '../../services/socket.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	name = "Dashboard"

	counts_clients = {
		total: 0,
		mobile: 0,
		desktop: 0
	};

	status = false;

	constructor(private sock_: SocketService) { }

	ngOnInit(): void {
		this.sock_.createConnection('ws/admin/dashboard');
		this.sock_.connectionStatus.subscribe((data: any) => {
			this.status = data;
		})
		this.sock_.msgReceived.subscribe((data: any) => {
			this.handleMsg(data)
		})
	}

	handleMsg(data: any) {
		console.log(data)
		if (data['type'] == 'data.clients.count') {
			this.counts_clients = JSON.parse(data['message']);
		}
	}

	retryConnection() {
		this.sock_.createConnection('ws/admin/dashboard');
	}

}
