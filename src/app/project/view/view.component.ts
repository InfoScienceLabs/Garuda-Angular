import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public show:boolean = false;
  public show_second:boolean = false;
  public showmain:boolean = false;
  public buttonName:any = 'Show';
  constructor() { }

  ngOnInit() {
    $('.dropify').dropify({
      messages: {
        'default': 'Drag and drop a file here or click',
        'replace': 'Drag and drop or click to replace',
        'remove':  'Remove',
        'error':   'Ooops, something wrong happended.'
    }
    });
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggle_second(){
    this.show_second = !this.show_second;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show_second)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  togglemain(){
    this.showmain = !this.showmain;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.showmain)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleaprmnt(){
    this.showmain = !this.showmain;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.showmain)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
}
