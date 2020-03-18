import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor() { 
    window.open("https://rinkeby.etherscan.io/", "_blank");
  }

  ngOnInit() {
  }

}
