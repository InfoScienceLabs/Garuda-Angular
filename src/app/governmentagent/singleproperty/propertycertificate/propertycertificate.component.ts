import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
         SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Property} from '../../../models/models';
import { PropertyService } from '../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { Type } from '../../../models/property';
import { HttpErrorResponse } from "@angular/common/http";
import { Navigation } from 'selenium-webdriver';
@Component({
  selector: 'app-propertycertificate',
  templateUrl: './propertycertificate.component.html',
  styleUrls: ['./propertycertificate.component.scss']
})
export class PropertycertificateComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<PropertycertificateComponent>,
                @Inject(MAT_DIALOG_DATA) public certificate_data : Property, private propertyService: PropertyService,
                private snackBar: MatSnackBar, private authService: AuthService) { }
  public property: Property;
  ngOnInit() {
    this.property = new Property();
    this.property = this.certificate_data;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public show: boolean = true;

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type: string = 'component';

  public disabled: boolean = false;

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

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

}
