import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtendedStorageService } from '../_shared/extended-storage.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
/**
   * navbar tylko dla widoku administratora, przenoszący do widoku administratora, 
   * możliwość wylogowania, zmiany widoku dla użytkownika nie będącego administratorem
   */
  constructor(private router: Router) { }

  ngOnInit() {
  }

/**  
 * Metoda umożliwiająca wylogowanie z serwisu
  */ 
  Wyloguj() {
    ExtendedStorageService.wyczyscCache();
    this.router.navigate(['/home']);
  }
}
