import { Component, OnInit, Inject , ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Property} from '../../../models/models';
import { PropertyService } from '../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { ClipboardService } from 'ngx-clipboard';
import { Type } from '../../../models/property';
import { HttpErrorResponse } from "@angular/common/http";

import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],

})
export class CertificateComponent implements OnInit {
  public disabled: boolean = false;

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };



  constructor( public dialogRef : MatDialogRef<CertificateComponent>,
                @Inject(MAT_DIALOG_DATA) public certificate_data : any, private propertyService: PropertyService,
                private snackBar: MatSnackBar, private authService: AuthService,private _clipboardService: ClipboardService) { }
  public property : Property;
  ngOnInit() {
      }

  onNoClick() : void {
    this.dialogRef.close();
  }
  copyToClipboard(){
    this.snackBar.open('Copied To Clipboard', "Close", {
      duration: 3000,
      panelClass: ["snackbar-color-change"]
    });  }
 }


