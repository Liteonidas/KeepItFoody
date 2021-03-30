import { Component, OnInit, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import { NgbDatepickerI18n, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CalendarDateFormatter } from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { DziennikDzienComponent } from '../dziennik-dzien/dziennik-dzien.component';
import { CustomDateFormatter } from '../_shared/datapicker.services';
import { I18n, CustomDatepickerI18n } from '../dziennik/dziennik.component';
import { BackendClientService } from '../_shared/backend-client.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';


@Component({
  selector: 'app-kalendarz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kalendarz.component.html',
  styleUrls: ['./kalendarz.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    I18n, 
    { 
      provide: NgbDatepickerI18n, 
      useClass: CustomDatepickerI18n
    }
  ]
})
export class KalendarzComponent implements OnInit {
  @ViewChild('dzien') dzien: DziennikDzienComponent;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  model;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  viewS: Subject<CalendarView> = new Subject<CalendarView>();


  events: CalendarEvent[] = [
    
  ];
  locale: string = 'pl';
  color: {
    primary: '#f79862',
    secondary: '#f79862'
  };
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  constructor(private apiService: BackendClientService, 
    private _i18n: I18n, 
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute, 
    private changeDetector: ChangeDetectorRef) { 
    this._i18n.language = 'pl';
  }

  
  ngOnInit() {
    
    this.config.minDate = null;
    this.config.maxDate = null;

    this.viewS.asObservable().subscribe(view => {
      this.view =  view;
    })

    this.pobierzPosiłki();
    
    this.fixNavigateToDay();

    this.route.params.subscribe(x => {
      if (x.date != null && x.date != undefined) {
        this.viewDate = new Date(x.date);
        this.setView(CalendarView.Day);
      } 
      else {
        this.viewDate = new Date();
        this.setView(CalendarView.Month);
      }
      this.model = {
        year: this.viewDate.getFullYear(),
        month: this.viewDate.getMonth(),
        day: ("0" +this.viewDate.getDate()).slice(-2) 
      }
    });

  }

  dayClicked(event): void {
    this.viewDate = event.day.date;
    this.viewS.next(CalendarView.Day);
  }

  setView(view: CalendarView) {
    this.viewS.next(view);
  }

  ZmienionoDzien(event) {
    this.viewDate = new Date(event.year + '-' + event.month + '-' + event.day);
    this.viewS.next(CalendarView.Day);
  }

  fixNavigateToDay() {
    setInterval(() => {
      let badges = document.getElementsByClassName('cal-day-badge');
      Array.prototype.forEach.call(badges, badge => {
        badge.style.backgroundColor = '#f79862';
      });

      let dots = document.getElementsByClassName('cal-event');
      Array.prototype.forEach.call(dots, dot => {
        dot.style.backgroundColor = '#f79862';
      });

    },1000)
  }

  pobierzPosiłki() {
    this.apiService.pobierzPosilki(sessionStorage.getItem('id')).subscribe(res => {
      let posilki = res['data'];
      posilki.forEach(posilek => {
        this.events.push(
          {
            title: posilek.meal_name,
            start: startOfDay(new Date(posilek.date)),
            end: endOfDay(new Date(posilek.date)),
            color: this.color,
          });
      });
    });
    this.events = [...this.events];
    this.changeDetector.markForCheck();
  }

}


@Pipe({ name: 'calendartitle' })
export class CalendarTitlePipe implements PipeTransform {
  transform(value: string) {
    let array = value.split(', ');
    if (array.length == 3) {
      let parts = array[1].split(' ');
      array[1] = parts.reverse().join(' ');
      return array[0].charAt(0).toUpperCase() + array[0].slice(1) + ', ' + array[1] + ' ' + array[2];
    }
    return value;
  }
}

