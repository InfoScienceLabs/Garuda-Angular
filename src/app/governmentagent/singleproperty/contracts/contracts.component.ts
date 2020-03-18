import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<ContractsComponent>,
               @Inject(MAT_DIALOG_DATA) public contracts_show : any) { }

               ngOnInit() {
                console.log(this.contracts_show);
              }
              onNoClick() : void {
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
