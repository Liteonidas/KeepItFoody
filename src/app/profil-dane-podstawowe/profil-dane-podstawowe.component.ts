import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, EmailValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendClientService } from '../_shared/backend-client.service';
import { ExtendedStorageService } from '../_shared/extended-storage.service';
import { NgbDatepickerConfig, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../_shared/datapicker.services';
import { I18n, CustomDatepickerI18n } from '../dziennik/dziennik.component';
import { timer } from 'rxjs';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-profil-dane-podstawowe',
  templateUrl: './profil-dane-podstawowe.component.html',
  styleUrls: ['./profil-dane-podstawowe.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    I18n, 
    { 
      provide: NgbDatepickerI18n, 
      useClass: CustomDatepickerI18n
    },
    MessageService
  ]
})
export class ProfilDanePodstawoweComponent implements OnInit {
/**
   * Możliwość dodania, zmiany danych przez użytkownika
   */
  @Input() model: any;
  // message: any = null;
  @Output()  przeliczBMR: EventEmitter<boolean> = new EventEmitter();
  today: string = null;

  constructor(private _i18n: I18n, private apiService: BackendClientService, private router: Router, private config: NgbDatepickerConfig, private message: MessageService) {
    this._i18n.language = 'pl';
   }

  public form: FormGroup;


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.model.name != 'null' && this.model.name !== undefined ? this.model.name : ''),
      date_birth: new FormControl(this.model.date_birth !== null && this.model.date_birth !== "undefined" ? this.StringToNgbDateStruct(this.model.date_birth) : ''),
      email: new FormControl({value: this.model.email !== null && this.model.email !== "undefined" ? this.model.email : '', disabled: true}),
    });

    let current = new Date();
    this.today = current.getFullYear() + '-' + ('0' + current.getMonth()).slice(-2) + '-' + ('0' + current.getDate()).slice(-2);
    this.config.minDate = {year: 1900, month: 1, day: 1};
    this.config.maxDate = {year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()};
    // this.config.startDate = this.StringToNgbDateStruct(this.model.date_birth)

    this.form.get('date_birth').valueChanges.subscribe(val => {
      if (this.SprawdzDateUrodzenia() ) {
        sessionStorage.setItem('date_birth', val.year + '-' + val.month + '-' + val.day);
        this.przeliczBMR.emit(true);
        this.message.content = null;
      }
      else {
        
        this.message.setAutohiddenMessage("Nieprawidłowa data urodzenia!");
      }
    });
  }

  ZapisDanych() {
    if  (this.form.valid && this.SprawdzDateUrodzenia())  {
      let model = new ZapisDanychModel();
      model.name = this.model.name;
      model.new_name = this.form.controls.name.value;
      model.date_birth = this.model.date_birth;
      model.new_date_birth = this.form.controls.date_birth.value.year + '-' + this.form.controls.date_birth.value.month + '-' + this.form.controls.date_birth.value.day;
      model.email = this.form.controls.email.value;
      model.new_height =  parseFloat(sessionStorage.getItem('height'));
      model.new_weight =  parseFloat(sessionStorage.getItem('weight'));
      model.new_sex = ExtendedStorageService.getSex();
      model.new_lifestyle = parseFloat(sessionStorage.getItem('lifestyle'));

      this.apiService.aktualizujDaneUzytkownika(model).subscribe(
        result => {
          this.message.setAutohiddenMessage(result['Message']);
          ExtendedStorageService.aktualizujDanePodstawowe(model);
          // ExtendedStorageService.aktualizujDaneSzczegolowe(model);
        },
        error => {
          this.message.setAutohiddenMessage(error.error);
        },
        () => {
          //..
        }
      );
    }
    else if (this.form.valid && !this.SprawdzDateUrodzenia()){
      this.message.setAutohiddenMessage("Nieprawidłowa data urodzenia!");
    }
  }

  SprawdzDateUrodzenia() : boolean {
    let structure = this.form.controls.date_birth.value;
    let date_birth = new Date(structure.year, structure.month, structure.day);
    let minDate = new  Date('1900-01-01');
    let current = new  Date();
    return date_birth >= minDate && date_birth < current;
  }

  private PrepareDateStringForInputDate(date) {
    let newDate = new Date(date);
    let day = ("0" + newDate.getDate()).slice(-2);
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    return newDate.getFullYear() + "-" + (month) + "-" + (day);
  }

  private StringToNgbDateStruct(value: string) {
    let arr = value.split('-');
    let obj = {
      year: Number.parseInt(arr[0]),
      month: Number.parseInt(arr[1]),
      day: Number.parseInt(arr[2]),
    };
    return obj;
  }
}
export class ZapisDanychModel {
  new_name: string;
  name: string;
  new_date_birth: string;
  date_birth: string;
  email: string;
  new_height: number;
  new_weight: number;
  new_sex: string;
  new_lifestyle: number;
}
