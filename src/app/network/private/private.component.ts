import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor(private router : Router) { 
    // window.location.href="http://158.69.118.172:4200";
    window.open("http://165.22.54.104:4100", "_blank");
   }

  ngOnInit() {
  }

}
