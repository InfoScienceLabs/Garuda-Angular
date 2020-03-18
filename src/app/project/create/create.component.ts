import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  location: any;
  type: string;
  action:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Ownet', location: 'hyderabad', type: 'Commercial', action:'edit delete'},
  {position: 2, name: 'Aparna homes', location: 'hyderabad', type: 'Residential', action:'edit delete'},
  {position: 3, name: 'Ownforms', location: 'hyderabad', type: 'Agricultural', action:'edit delete'},
  {position: 4, name: 'Advanta Limited', location: 'hyderabad', type: 'Residential', action:'edit delete'},
  {position: 5, name: 'Ramky One Marvel', location: 'hyderabad', type: 'Residential', action:'edit delete'},
  {position: 6, name: 'Tummala Builders', location:'hyderabad', type: 'Residential', action:'edit delete'},
  {position: 7, name: 'Malayasian homes', location: 'hyderabad', type: 'Residential', action:'edit delete'},
  {position: 8, name: 'Bhandari Homes', location: 'hyderabad', type: 'Residential', action:'edit delete'},
  {position: 9, name: 'SVP', location: 'hyderabad', type: 'Commerciale', action:'edit delete'},
  {position: 10, name: 'Dhanasree Arcade', location: 'hyderabad', type: 'Commercial', action:'edit delete'},
];
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'location', 'type','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

}
