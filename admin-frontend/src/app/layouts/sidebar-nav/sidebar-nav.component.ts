import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar-nav',
	templateUrl: './sidebar-nav.component.html',
	styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {

	comp: any = null;
	user: any = null;

	sideBar: any = null;
	toggler: any = null;
	moved: boolean = false;

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.user = this.auth.getUser();
	}

	ngAfterViewInit() {
		this.sideBar = document.getElementById("mobile-nav");
		this.toggler = document.getElementById("mobile-toggler");
		this.sideBar.style.transform = "translateX(-260px)";
		this.moved = true;
	}

	sidebarHandler() {
		if (this.moved) {
			this.sideBar.style.transform = "translateX(0px)";
			this.moved = false;
		} else {
			this.sideBar.style.transform = "translateX(-260px)";
			this.moved = true;
		}
	}

	logout() {
		this.auth.logout();
		this.router.navigate(["/login"]);
	}

	viewSet(comp: any) {
		this.comp = comp;
	}

}
