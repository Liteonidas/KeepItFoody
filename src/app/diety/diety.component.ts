import { Component, OnInit } from '@angular/core';
//import {DziennikComponent} from '../dziennik';

@Component({
  selector: 'app-diety',
  templateUrl: './diety.component.html',
  styleUrls: ['./diety.component.css']
})
export class DietyComponent implements OnInit {
/**
   * Przestarzały komponent, nie użyty w końcowej wersji strony
   */
  premium: boolean = true;

  constructor() { }

  ngOnInit() {

  }

}


