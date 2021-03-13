import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  title = 'Jonas Dorfinger';
  copyright = '© Copyright by Jonas Dorfinger, 2020. All rights reserved.';
  items = [
    {name: 'Home'},
    {name: 'About'},
    {name: 'Skills'},
    {name: 'Work'},
    {name: 'Gallery'},
    {name: 'Contact'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
