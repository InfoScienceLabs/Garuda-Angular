import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-builder-footer',
  templateUrl: './builder-footer.component.html',
  styleUrls: ['./builder-footer.component.scss']
})
export class BuilderFooterComponent implements OnInit {
  public date: Date;
  constructor() { }
  public year: any;
  ngOnInit() {
    this.date = new Date();
    this.year = this.date.getFullYear();
  }

}









