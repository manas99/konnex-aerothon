import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';

declare let $: any;
declare let alertify: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	uname = "";
	pass = "";
	returnUrl = "dashboard";

	constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, public config: ConfigService) { }

	ngOnInit() {
		if (this.route.snapshot.queryParams.returnUrl) {
			this.returnUrl = this.route.snapshot.queryParams.returnUrl;
		}
		if (this.auth.isLoggedIn()) {
			this.auth.validate().subscribe((res) => {
				if (res.success) {
					this.router.navigate([this.returnUrl]);
				}
			});
		}
	}

	submit() {
		this.auth.login(this.uname, this.pass).subscribe((res) => {
			if (res.result.error) {
				alertify.error(res.result.error_description);
			} else {
				alertify.success('Logged In!');
				window.location.href = this.returnUrl;
			}
		});
	}

}
