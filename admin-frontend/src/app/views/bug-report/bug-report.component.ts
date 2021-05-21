import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.scss']
})
export class BugReportComponent implements OnInit {

  records = [{id: 1, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020"},
             {id: 2, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020"},
             {id: 3, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020"},
             {id: 4, description: "ahuiewir  fuuffjhc", date_time: "01/01/2020"}]

  constructor(private konnex: KonnexService) { }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
		this.konnex.readReport().subscribe((res: any) => {
			if (res.success) {
				this.records = res.result;
			}
		});
	}

  deleteRecord(rec: any) {
		var html = 'Are you sure that you want to delete the Bug Report?';
		alertify.confirm("Delete Bug Report", html, () => {
			this.konnex.deleteReport(rec.id).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}

	updateRecord(rec: any) {
		var html = '';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Description" id="b-description" value="' + rec.description + '" disabled/>';
		html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Date-time" id="b-date-time" value="' + rec.date_time + '"/>';



		alertify.confirm('Edit Report', html, () => {
			var data: any = {}
			data['description'] = $('#b-description');
			data['date-time'] = $('#b-date-time').val();
			this.konnex.editReport(data).subscribe((res: any) => {
				if (res.success) {
					alertify.success(res.message);
					this.getRecords();
				}
			});
		}, () => { })
	}


}
