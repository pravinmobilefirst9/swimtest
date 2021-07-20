import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { SbAuthenticationService } from '../../auth/sb-authentication.service';
import {AppConfig} from "../../config/app.config";
import { Sbmessage } from 'src/model/sb-messages';

@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  destination: String;

  uploadedFiles: any[] = [];

  msgs: Sbmessage[] = [];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private authenticationService: SbAuthenticationService,
    private appConfig: AppConfig
  ) {
    this.destination = `${appConfig.gatewayBaseUrl}/csv`;
    //this.destination = 'https://www.primefaces.org/primeng/showcase/upload.php';
    this.breadcrumbService.setItems([
      { label: 'Portfolio' },
      { label: 'File Upload' }
    ]);
  }

  ngOnInit() { }

  onSelectEvent(event) {
    console.log("Selected files", event);
  }

  public onUpload(event) {

     for(let file of event.files) {
       this.uploadedFiles.push(file);
     }

     this.msgs.push({
     severity: 'success',
     summary: 'File uploaded.',
     detail: ''
     }); 

  }

  onBeforeSend(event) {
    this.authenticationService.addTokenToXhr(event.xhr); 
  }

  ngOnDestroy(): void {
    this.breadcrumbService.setItems([]);
  }

  onError(event) {

    this.msgs.push({
      severity: 'error',
      summary: 'Error on file upload.',
      detail: ''
    }); 

  }
}
