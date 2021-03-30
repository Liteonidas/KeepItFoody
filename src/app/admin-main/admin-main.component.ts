import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
/**
   * navbar tylko dla widoku administratora, przenoszący do widoku administratora, 
   * możliwość wylogowania, zmiany widoku dla użytkownika nie będącego administratorem
   */
  constructor(private router: Router) { }

  ngOnInit() {
  }

  RedirectToKalendarz() {
    this.router.navigate(['/kalendarz/' + new Date()]);
  }

}
