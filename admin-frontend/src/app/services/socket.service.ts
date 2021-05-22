import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './config.service';

declare let alertify: any;

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	_host: any = null;
	_socket: any = null;
	_msgReceived: Subject<any> = new Subject<any>();
	_connectionStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get msgReceived() {
		return this._msgReceived;
	}

	get connectionStatus() {
		return this._connectionStatus;
	}

	constructor(private http: HttpClient, private conf_: ConfigService) {
		this._host = "ws://" + this.conf_.BASE_HOST + "/";
	}

	createConnection(channel: string) {
		if (this._socket != null) {
			this.closeActiveConnection();
		}
		this._socket = new WebSocket(this._host + channel);
		this._socket.onopen = (event: any) => { this._socketOnOpen(event) };
		this._socket.onmessage = (msg: any) => { this._socketMsgReceived(msg) };
		this._socket.onerror = (error: any) => { this._socketError(error) };
		this._socket.onclose = (event: any) => { this._socketOnClose(event) };
	}

	closeActiveConnection() {
		if (this._socket != null) {
			this._socket.close()
		}
	}

	sendMsg(action: string, message = "") {
		if (this._isSockOpen()) {
			var data = JSON.stringify({ action: action, message: message });
			this._socket.send(data);
		}
	}

	_socketOnOpen(msg: any) {
		this._connectionStatus.next(true);
		alertify.success("Successfully connected to websocket server.")
	}
	_socketMsgReceived(ret: any) {
		var msg = JSON.parse(ret.data);
		this._msgReceived.next(msg);
	}
	_socketError(error: any) {
		alertify.error("An error occurred.")
	}
	_socketOnClose(event: any) {
		this._connectionStatus.next(false);
	}

	_isSockOpen() {
		if (!!this._socket) {
			if (this._socket.readyState == WebSocket.OPEN) {
				return true;
			}
		}
		return false;
	}

	read() {
		return this.http.get<any>(this.conf_.BASE_URL + "sockets/read");
	}

	delete(id: number) {
		var params: any = {};
		params['conn_id'] = id;
		return this.http.post<any>(this.conf_.BASE_URL + "sockets/delete", params);
	}

}
