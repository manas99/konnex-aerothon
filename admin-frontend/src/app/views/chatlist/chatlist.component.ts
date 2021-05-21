import { Component, OnInit } from '@angular/core';

import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.scss']
})
export class ChatlistComponent implements OnInit {

  records = [{id: 1, client_id: 10, started_at: "02/02/2020", ended_at: "02/02/2020"},
             {id: 2, client_id: 11, started_at: "02/02/2020", ended_at: "02/02/2020"},
             {id: 3, client_id: 12, started_at: "02/02/2020", ended_at: "02/02/2020"},
             {id: 4, client_id: 13, started_at: "02/02/2020", ended_at: "02/02/2020"}]
  constructor(private konnex: KonnexService) { }

  ngOnInit() {
    this.getRecords();
  }

  getRecords() {
    this.konnex.readFeedback().subscribe((res: any) => {
      if (res.success) {
        this.records = res.result;
      }
    });
  }

  deleteRecord(rec: any) {
    var html = 'Are you sure that you want to delete the Feedback?';
    alertify.confirm("Delete Feedback", html, () => {
      this.konnex.deleteFeedback(rec.id).subscribe((res: any) => {
        if (res.success) {
          alertify.success(res.message);
          this.getRecords();
        }
      });
    }, () => { })
  }

  updateRecord(rec: any) {
    var html = '';
    html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Feedback" id="feedback" value="' + rec.feedback + '" disabled/>';
    html += '<input class="my-2 p-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Date-time" id="f-date-time" value="' + rec.date_time + '"/>';

    if (rec.is_active) {
      html += 'checked'
    }
    html += '>';
    html += '<label class="custom-control-label" for="is-active">Is Active</label>';
    html += '</div>';

    alertify.confirm('Edit Feedback', html, () => {
      var data: any = {}
      // data['feedback_id'] = rec.id;
      data['feedback'] = $('#feedback').val();

      this.konnex.editFeedback(data).subscribe((res: any) => {
        if (res.success) {
          alertify.success(res.message);
          this.getRecords();
        }
      });
    }, () => { })
  }



}
