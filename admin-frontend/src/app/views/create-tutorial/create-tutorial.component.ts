import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;

@Component({
	selector: 'app-create-tutorial',
	templateUrl: './create-tutorial.component.html',
	styleUrls: ['./create-tutorial.component.scss']
})
export class CreateTutorialComponent implements OnInit {

	name = "Create Tutorial"

	intent = "";
	description = "";

	steps: any = [];

	constructor(private konnex: KonnexService, private router: Router) { }

	ngOnInit(): void {
	}

	createRecord() {
		var data: any = {};
		if (this.intent == "") {
			return alertify.error("Key cannot be empty.");
		}
		if (this.description == "") {
			return alertify.error("Description cannot be empty.");
		}
		for (const x of this.steps) {
			if (!x.step_number) {
				return alertify.error("Step number cannot be empty.");
			}
			if (!x.html_id) {
				return alertify.error("HTML ID cannot be empty.");
			}
		}
		data['intent'] = this.intent;
		data['description'] = this.description;
		data['steps'] = JSON.stringify(this.steps);
		this.konnex.createTutorial(data).subscribe((res: any) => {
			if (res.success) {
				alertify.success(res.message);
				this.router.navigate(['/tutorials']);
			}
		});
	}

	addStep() {
		this.steps.push({
			"step_number": null,
			"html_id": "",
			"description": ""
		});
	}

	removeStep(i: number) {
		this.steps.splice(i, 1);
	}
}
