import { Component, OnInit, Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  pl: {
    weekdays: ['Po', 'Wt', 'Śr', 'Cz', 'Pi', 'So', 'Nie'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpnień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
  },
};

// Define a service holding the language. You probably already have one if your app is i18ned.
@Injectable()
export class I18n {
  
  language = 'en';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  getDayAriaLabel(date: import("@ng-bootstrap/ng-bootstrap").NgbDateStruct): string {
    return '';
  }
/**
   * Kalkulator żywieniony, przygotowanie kalendarza z podziałem na miesiące,
   * możliwość przejścia na konkretne daty, przez datapicker, przmieszczanie się 
   * także guzikami poprzedni/kolejny
   */
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}


@Component({
  selector: 'app-dziennik',
  templateUrl: './dziennik.component.html',
  styleUrls: ['./dziennik.component.css'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] 
})
export class DziennikComponent implements OnInit {

  model;
  numerWidoku:number=1;
  dzien: string;
  miesiac:string;
  rok:number;

  obecnaDataFormat: string;
  obecnyData: Date =null;

  constructor(private _i18n: I18n) { 
    this._i18n.language = 'pl';
  }

  ngOnInit() {
    this.obecnyData = new Date();
    this.ZmianaObecnejDaty({date: this.obecnyData, czyPokazacDzien: false});
  }
  
  trybKalendarza(value: number){
    this.numerWidoku=value;
    if (value == 0) {
      this.ZmianaObecnejDaty({date: this.obecnyData, czyPokazacDzien: true});
    }
  }
/**
   * Metoda zmiany miesiąca w kalendarzu
   */
  ZamienMiesiac(value){
    switch(value){
      case 0:
      return "Styczeń";
      
      case 1:
      return "Luty";

      case 2:
      return "Marzec";

      case 3:
      return "Kwiecień";

      case 4:
      return "Maj";

      case 5:
      return "Czerwiec";

      case 6:
      return "Lipiec";
      
      case 7:
      return "Sierpień";

      case 8:
      return "Wrzesień";

      case 9:
      return "Październik";

      case 10:
      return "Listopad";

      case 11:
      return "Grudzień"; 
    }
  }

  ZmianaObecnejDaty(event) {
    this.dzien = event.czyPokazacDzien ? ("0" + event.date.getDate()).slice(-2) : '';
    this.miesiac = this.ZamienMiesiac(event.date.getMonth());
    this.rok = event.date.getFullYear();
    this.obecnaDataFormat = ("0" + event.date.getDate()).slice(-2) + '/' + ("0" + event.date.getMonth()).slice(-2) + '/' + this.rok;
    this.obecnyData = event.date;
    this.model = {
      "year": this.rok,
      "month": this.miesiac,
      "day": this.dzien 
    }
  }

  ZmienWidok(numerWidoku) {
    this.numerWidoku = numerWidoku;
  }

  ZmienionoDzien(event) {
    this.ZmienWidok(0);
    let eventModel = {
      czyPokazacDzien: true,
      date: new Date(event.year + '-' + event.month + '-' + event.day)
    }
    this.ZmianaObecnejDaty(eventModel);
  }
}
