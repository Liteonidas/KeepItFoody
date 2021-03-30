import { Component, OnInit } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';

@Component({
  selector: 'app-dieta-wyswietlanie',
  templateUrl: './dieta-wyswietlanie.component.html',
  styleUrls: ['./dieta-wyswietlanie.component.css']
})
export class DietaWyswietlanieComponent implements OnInit {
/**
   * Przestarzały komponent, nie użyty w końcowej wersji strony
   */

  constructor(private apiService: BackendClientService) { }

  ngOnInit() {
    this.apiService.pobierzDiete().subscribe(res => {
    })
  }

  
}
