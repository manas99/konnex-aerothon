declare let $: any;
declare let tippy: any;
class Konnex {
	_pre = "knx";
	// Chat body structure
	// <div id="body">
	//     <div id="chat-circle" class="btn btn-raised">
	//         <div id="chat-overlay"></div>
	//         <i class="material-icons">speaker_phone</i>
	//     </div>
	//     <div class="chat-box">
	//         <div class="chat-box-header">
	//             Konnex Support
	//             <span class="chat-box-toggle">
	//                 <i class="material-icons">close</i>
	//             </span>
	//         </div>
	//         <div class="chat-box-body">
	//             <div class="chat-box-overlay"></div>
	//             <div id="chat-logs"></div>
	//         </div>
	//         <div class="chat-input">
	//             <form>
	//                 <input type="text" id="chat-input" placeholder="Send a message..." />
	//                 <button type="button" class="chat-submit" id="chat-submit">
	//                     <i class="material-icons">send</i>
	//                 </button>
	//             </form>
	//         </div>
	//     </div>
	// </div>
	_chat_cont = null;
	_chat_circle = null;
	_chat_box = null;
	_chat_box_header = null;
	_chat_box_header_toggle = null;
	_chat_box_body = null;
	_chat_logs = null;
	_chat_inp_cont = null;
	_chat_inp_field = null;
	_chat_inp_btn = null;
	_user_id: string = null;
	_socket = null;

	ws_host = '';

	constructor(ws_host) {
		this.ws_host = ws_host;
		this.createChat();
		this.newUser();
		this.newSocketConnection();
	}

	createChat() {
		console.log("Creating chat");
		this._chat_cont = this._createEle("div", { id: 'body' });
		this._chat_circle = this._createEle("div", { id: 'chat-circle', className: 'btn btn-raised' });
		this._chat_circle.innerHTML = '<div id="chat-overlay"></div><i class="material-icons">speaker_phone</i>';
		this._chat_cont.appendChild(this._chat_circle);
		this._chat_box = this._createEle("div", { className: 'chat-box' });
		this._chat_box_header = this._createEle("div", { className: "chat-box-header" });
		this._chat_box_header.innerHTML = 'Konnex Support';
		this._chat_box_header_toggle = this._createEle('span', { className: "chat-box-toggle" });
		this._chat_box_header_toggle.innerHTML = '<i class="material-icons">close</i>';
		this._chat_box_header.appendChild(this._chat_box_header_toggle);
		this._chat_box.appendChild(this._chat_box_header);
		this._chat_box_body = this._createEle("div", { className: 'chat-box-body' });
		this._chat_box_body.innerHTML = '<div class="chat-box-overlay"></div>';
		this._chat_logs = this._createEle('div', { id: "chat-logs" });
		console.log("Creating chat logs", this._chat_logs);
		this._chat_box_body.appendChild(this._chat_logs);
		this._chat_box.appendChild(this._chat_box_body);
		this._chat_inp_cont = this._createEle("div", { className: 'chat-input' });
		this._chat_inp_field = this._createEle("input", { type: 'text', id: "chat-input", placeholder: "Send a message..." });
		this._chat_inp_btn = this._createEle("button", { type: 'button', id: "chat-submit", className: 'chat-submit' });
		this._chat_inp_btn.innerHTML = '<i class="material-icons">send</i>'
		this._chat_inp_cont.appendChild(this._chat_inp_field);
		this._chat_inp_cont.appendChild(this._chat_inp_btn);
		this._chat_box.appendChild(this._chat_inp_cont);
		this._chat_cont.appendChild(this._chat_box);

		document.body.appendChild(this._chat_cont);
		$(this._chat_circle).click((event) => {
			this._toggle();
		});
		$(this._chat_box_header_toggle).click((event) => {
			this._toggle();
		});
		$(this._chat_inp_btn).click((event) => {
			this.submitMsg(this._chat_inp_field.value);
		});
	}

	newUser() {
		this._user_id = this._generateUserId();
	}

	newSocketConnection() {
		console.log("Creating socket");
		this._socket = new WebSocket(this.ws_host);
		this._socket.onopen = (event) => { this._socketOnOpen(event) };
		this._socket.onmessage = (msg) => { this._socketMsgReceived(msg) };
		this._socket.onerror = (error) => { this._socketError(error) };
		this._socket.onclose = (event) => { this._socketOnClose(event) };
	}

	_toggle() {
		$(this._chat_circle).toggle('scale');
		$(this._chat_box).toggle('scale');
	}

	_userChatSubmit() {
		//send message using sockets
	}

	_socketOnOpen(msg) {
		console.log(msg);
		//take action
	}
	_socketMsgReceived(ret) {
		console.log(ret);
		//handle msg and take action
		var msg = JSON.parse(ret);
		if (msg['action'] == 'chat') {
			this.displayMsg(msg['data']);
		}
	}
	_socketError(error) {
		console.log(error);
		//display error
		// this._chat_logs.innerHTML = "<div class='text-center text-danger'>Could not connect to server</div>";
		$(this._chat_logs).html("<div class='text-center text-danger'>Could not connect to server</div>")
	}
	_socketOnClose(event) {
		console.log(event);
		//take action
	}

	_generateUserId() {
		const len = 20;
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var result = '';
		for (var i = 0; i < len; i++) {
			result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
		}
		return result;
	}

	displayMsg(msg) {
		var str = "";
		str += '<div class="chat-msg user">';
		str += '<span class="msg-avatar"></span>';
		str += '<div class="cm-msg-text">' + msg + '</div>';
		str += '</div>';
		$(this._chat_logs).append(str);
		$(this._chat_logs).stop().animate({
			scrollTop: $(".chat-logs")[0].scrollHeight
		}, 1000);
	}
	submitMsg(msg) {
		if (msg.trim() == '') {
			return false;
		}
		var str = "";
		str += '<div class="chat-msg self">';
		str += '<span class="msg-avatar"></span>';
		str += '<div class="cm-msg-text">' + msg + '</div>';
		str += '</div>';
		$(this._chat_logs).append(str);
		$(this._chat_inp_field).val('');
		$(this._chat_logs).stop().animate({
			scrollTop: $(".chat-logs")[0].scrollHeight
		}, 1000);
	}

	showTutorial(arr) {
		for (var i = 0; i < arr.length; i++) {
			var ele = "#" + arr[i]["html_id"];
			tippy(ele, {
				placement: 'right',
				content: arr[i]["description"],
			});
		}
	}

	displayAnnouncement(msg) {
		tippy('#chat-circle', {
			content: msg,
		});
	}

	_createEle(tag, params) {
		return Object.assign(document.createElement(tag), params);
	}
}
