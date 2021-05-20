import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent implements OnInit {

    // isList: number = 0;
    // isMenu: boolean = false;
    // isSearch: boolean = false;
    sideBar: any = null;
    toggler: any = null;
    moved: boolean = false;

  constructor() { }

  ngOnInit(): void {
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

}
