import { Component, OnInit } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
/**
   * Pobranie ilości rekordów z bazy
   */
  statystyki = [
    { 
      key: 'diets',
      value: 0,
    },
    { 
      key: 'recipes',
      value: 0,
    },
    { 
      key: 'ingredients',
      value: 0,
    },
    { 
      key: 'users',
      value: 0,
    },
    { 
      key: 'active_users',
      value: 0,
    },
    { 
      key: 'unactive_users',
      value: 0,
    },
  ]

  constructor(private apiService: BackendClientService) { }

  ngOnInit() {
    this.pobierzStatystyki();
  }

  pobierzStatystyki() {
    this.statystyki.forEach(statystyka => {
      this.apiService.pobierzStatystyke(statystyka.key).subscribe(res => {
        if (res['Message'].includes('Liczba')) {
          statystyka.value = res['Message'].split(': ')[1];
        }
      },
      err => {
      });
    });
  }
}
