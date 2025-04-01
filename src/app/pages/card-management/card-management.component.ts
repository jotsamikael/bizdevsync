import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss']
})
export class CardManagementComponent implements OnInit {
 // bread crumb items
 breadCrumbItems: Array<{}>;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Skote' }, { label: 'Card management', active: true }];

  }


  openEditModal(edit:any){

  }
}
