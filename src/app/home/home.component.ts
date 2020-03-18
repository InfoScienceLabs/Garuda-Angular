import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentYear: any;
  constructor() {
    this.currentYear =  new Date().getFullYear();
    // this.year = this.currentYear.getFullYear();
  }

  ngOnInit() {
  }
}
