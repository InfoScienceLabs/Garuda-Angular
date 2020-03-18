import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {
  public date : Date;
  constructor() {
    
   }
 
  public year: any;

  ngOnInit() {
    this.date = new Date();
    this.year =  this.date.getFullYear();
  }

}
