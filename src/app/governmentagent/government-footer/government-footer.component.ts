import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-government-footer',
  templateUrl: './government-footer.component.html',
  styleUrls: ['./government-footer.component.scss']
})
export class GovernmentFooterComponent implements OnInit {
  public date: Date;
  constructor() { }
  public year: any;
  ngOnInit() {
    this.date = new Date();
    this.year = this.date.getFullYear();
  }

}