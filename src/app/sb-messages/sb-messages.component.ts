import { Component, Input, OnInit } from '@angular/core';
import { Sbmessage } from 'src/model/sb-messages';

@Component({
  selector: 'app-sb-messages',
  templateUrl: './sb-messages.component.html',
  styleUrls: ['./sb-messages.component.scss']
})
export class SbMessagesComponent implements OnInit {
  @Input() messages: Sbmessage[];

  constructor() { }

  ngOnInit(): void {

    console.log(this.messages);
  }

  getMessageIconsAndColor(message) {

    console.log("SB Message==>"+message.severity);

    if (message.severity === 'error') {
      return { color: 'error-bg', icon: 'error_outline'};
    } else if (message.severity === 'success') {
      return { color: 'success-bg', icon: 'check_circle_outline'};
    } else if (message.severity === 'warning') {
      return { color: 'warn-bg', icon: 'report_problem'};
    }
  }

}
