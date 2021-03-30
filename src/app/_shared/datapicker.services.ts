import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';

export const I18N_VALUES = {
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
 * Konstruktor klasy, która jest usługą tłumaczącą dni i miesiące w kalendarzu 
*/
  constructor(private _i18n: I18n) {
    super();
  }
/** 
 * Metoda tlumaczy dla skróconej nazwy dni
*/
  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  /** 
   * Metoda tłumaczy dla skróconej nazwy miesięcy
  */
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  /** 
   * Metoda tłumaczy dla pełnej nazwy miesięcy
  */
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH:mm', locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}
  