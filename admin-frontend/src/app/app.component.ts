import { Component, OnInit } from "@angular/core";

@Component({
    //selector: "app-light-with-icons-at-bottom",
    //templateUrl: "./light-with-icons-at-bottom.component.html",
    selector: 'app-root',
    templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {
    title = 'admin-frontend';
     isList: number = 0;
    isMenu: boolean = false;
    isSearch: boolean = false;
    constructor() {}
    ngOnInit(): void {}
}
