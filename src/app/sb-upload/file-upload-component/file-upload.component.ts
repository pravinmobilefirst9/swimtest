import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { Message } from 'primeng/primeng';
import { SbAuthenticationService } from '../../auth/sb-authentication.service';
import {AppConfig} from "../../config/app.config";

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  destination: String;

  msgs: Message[];

  uploadedFiles: any[] = [];

  durationInSeconds = 5;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private authenticationService: SbAuthenticationService,
    private appConfig: AppConfig,private _snackBar: MatSnackBar
  ) {
    this.destination = `${appConfig.gatewayBaseUrl}/csv`;
    this.breadcrumbService.setItems([
      { label: 'Portfolio' },
      { label: 'File Upload' }
    ]);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit() { }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    this.openSnackBar();
  }

  onBeforeSend(event) {
    this.authenticationService.addTokenToXhr(event.xhr);
  }

  ngOnDestroy(): void {
    this.breadcrumbService.setItems([]);
  }

  onError(event) { }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
