import { Component, OnInit } from '@angular/core';
import { KonnexService } from '../../services/konnex.service';

declare let $: any;
declare let alertify: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  records = [{id: 1, feedback: "ahuiewir  fuuffjhc", date_time: "01/01/2020"},
             {id: 2, feedback: "ahuiewir  fuuffjhc", date_time: "01/01/2020"},
             {id: 3, feedback: "ahuiewir  fuuffjhc", date_time: "01/01/2020"},
             {id: 4, feedback: "ahuiewir  fuuffjhc", date_time: "01/01/2020"}]
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
