import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Przepis } from '../przepisy-wyswietlanie/przepisy-wyswietlanie.component';
import { Skladniki } from '../skladniki-wyswietlanie/skladniki-wyswietlanie.component';
import { NgbModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { BackendClientService } from '../_shared/backend-client.service';
import { MessageService } from '../_shared/message.service';
import { ExtendedStorageService } from '../_shared/extended-storage.service';

@Component({
  selector: 'app-dziennik-dzien',
  templateUrl: './dziennik-dzien.component.html',
  styleUrls: ['./dziennik-dzien.component.css'],
  providers: [
    MessageService
  ]
})
export class DziennikDzienComponent implements OnInit, OnChanges {

  @Input() date: Date = null;
  @Output() obecnaData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("plan") plan;
  @ViewChild("realizacja") realizacja;

  currentStep: number = 0;
/**
   * Widok oraz logika DNIA, widok, możliwosć dodawania posiłku, progresbar zapełniający się
   * na podstawie zaloryczności posiłków 
   */
  constructor(private apiService: BackendClientService, private changeDetector: ChangeDetectorRef, private modalService: NgbModal, private message: MessageService, private calendar: NgbCalendar) {

  }

  kaloriePosilkow: number = 0;
  bmr: number = null;
  water: number = null;
  realizacjaProcent: number = null;
  planProcent: number = null;
  realizacjaTytul: string = '';
  reallizacajaPodtytul: string = '';
  formGroup: FormGroup = null;
  czas = { hour: 0, minute: 0 };
  datePicker: NgbDateStruct;
  dateFromPicker: { year: number; month: number; };
  // message: string = null;
  dodajAktywne: boolean = false;
  posilki: any[] = null;
  wszystkiePrzepisy: Przepis[] = null;
  przefiltrowanePrzepisy: Przepis[] = null;
  wybranyPrzepis: Przepis = null;
  WybranyPosilek: any = null;
  czyPrzyciskDodajPosilekAktywny: boolean = false;

  wybranySkladnik: Skladniki = null;
  wszystkieSkladniki: Skladniki[] = null;
  przefiltrowaneSkladniki: Skladniki[] = null;
  wybraneSKladniki: { skladnik: Skladniki, quantity: number, number: number }[] = null;
  isVisible: number = 0;

  ngOnInit() {
    let current = new Date();
    this.czas.hour = current.getHours();
    this.czas.minute = current.getMinutes();
    this.datePicker = {
      day: current.getDate(),
      year: current.getFullYear(),
      month: current.getMonth() +1
    };

    this.oblicBRMiWode();
    this.realizacjaProcent = 0;
    this.planProcent = 100;
    this.changeDetector.markForCheck();
    this.czyPrzyciskDodajPosilekAktywny = true;

    this.formGroup = new FormGroup({
      nazwa: new FormControl('', Validators.required),
      szukajPrzepisu: new FormControl(''),
      gramatura: new FormControl({value: '', disabled: true}),
      szukajSkladnika: new FormControl(''),
      quantity: new FormControl('', [Validators.max(10000), Validators.min(0)]),
      number: new FormControl('', [Validators.max(10000), Validators.min(0)])
    });

    this.formGroup.get('quantity').valueChanges.subscribe(val => {
      if (val < 0) {
        this.formGroup.controls.quantity.patchValue(Math.abs(val));
      }
      else if (val != 0 && val != null) {
        this.formGroup.controls.number.patchValue(null, { emitEvents: false });
      }
    });

    this.formGroup.get('number').valueChanges.subscribe(val => {
      if (val < 0) {
        this.formGroup.controls.number.patchValue(Math.abs(val));
      }
      else if (val != 0 && val != null) {
        this.formGroup.controls.quantity.patchValue(null, { emitEvents: false });
      }
    });

    this.pobierzListePrzepisow();
    this.pobierzListSkladnikow();
    this.obserwujZmianyWFormularzu();
  }
  /** Metoda przestarzała   */
  open(content, posilek) {
    this.WybranyPosilek = posilek;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
  }
/**
 *Metoda przestarzała
 */
  Przep() {
    this.isVisible = 0;
    this.formGroup.controls.gramatura.patchValue(0);
  }
/**
 * Metoda przestarzała
 */
  Sklad() {
    this.isVisible = 1;
    this.formGroup.controls.gramatura.patchValue(0);
  }

  Next() {
    if (this.currentStep == 4) {
    }
    else {
      if(this.currentStep == 2){
        this.formGroup.controls.gramatura.patchValue(parseInt(this.formGroup.controls.gramatura.value));
      }
      this.currentStep++;
      document.getElementById('step-' + (this.currentStep + 1)).click();
    }
  }
  Prev() {
    if (this.currentStep == 0) {
      (<any>document.getElementsByClassName('close')[0]).click();
    }
    else {
      this.currentStep--;
      document.getElementById('step-' + (this.currentStep + 1)).click();
    }
  }
 /**
 *Metoda pobieajcą szczegóły posiłku
 */
  pobierzSzczegoly(posilek) {
    if (posilek.id_recipe != null) {
      this.apiService.pobierzPrzepis(posilek.id_recipe).subscribe(res => {
        posilek['ingredients'] = res['data'];
        this.obliczKaloriePosilku(posilek);
      });
    }
    else {
      this.apiService.pobierzSkladnikiDoPosilku(sessionStorage.getItem('id'), posilek.id_meal).subscribe(res => {
        posilek['ingredients'] = res['data'];
        this.obliczKaloriePosilku(posilek);
      });
    }
  }

/**
 *metoda pobierająca wodę i bmr użytkownika
 */
  oblicBRMiWode() {
    this.apiService.pobierzWodeIBMR(ExtendedStorageService.pobierzDaneUzytkownika().id).subscribe(res => {
      this.bmr = Object.keys(res).includes("bmr") ? res['bmr'] : 0;
      this.water = Object.keys(res).includes("water") ? res['water'] : 0;
    },
      err => {
        this.bmr = 0;
        this.water = 0;
      },
      () => {
        this.realizacjaTytul = this.kaloriePosilkow.toFixed(0) + '/' + this.bmr.toFixed(0) + ' kcal';
        this.reallizacajaPodtytul = this.water.toFixed(1);
        this.changeDetector.markForCheck();
      });
  }
/**
 *Metoda obliczająca wiek użytkownika
 */
  wiek(birth) {
    let now = new Date();
    let birthDate = new Date(birth);
    return now.getFullYear() - birthDate.getFullYear();
  }

  /**
 *Metoda pobierająca listę przepisów
 */
  pobierzListePrzepisow() {
    this.apiService.pobierzPrzepisy().subscribe(result => {
      this.wszystkiePrzepisy = result['data'].sort((a, b) => (a.recipe_name > b.recipe_name) ? 1 : ((b.recipe_name > a.recipe_name) ? -1 : 0));
      this.changeDetector.markForCheck();
    })
  }

  /**
 *Metoda przefiltrowująca składniki / przepisy w formularzau
 */
  obserwujZmianyWFormularzu() {
    this.formGroup.valueChanges.subscribe(result => {
      if (![null, undefined, ''].includes(result.szukajPrzepisu)) {
        this.przefiltrowanePrzepisy = this.wszystkiePrzepisy.filter(x => x.recipe_name.toUpperCase().includes(result.szukajPrzepisu.toUpperCase()));
      }
      else {
        this.przefiltrowanePrzepisy = this.wszystkiePrzepisy;
      }

      if (![null, undefined, ''].includes(result.szukajSkladnika)) {
        this.przefiltrowaneSkladniki = this.wszystkieSkladniki.filter(x => x.name.toUpperCase().includes(result.szukajSkladnika.toUpperCase()));
      }
      else {
        this.przefiltrowaneSkladniki = this.wszystkieSkladniki;
      }
      this.changeDetector.markForCheck();
    })

  }
/**
 *Metoda pobierająca listę składników
 */
  pobierzListSkladnikow() {
    this.apiService.pobierzSkladniki().subscribe(result => {
      this.wszystkieSkladniki = result['data'].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.changeDetector.markForCheck();
    });
  }
/**
 * Metoda pobierająca posiłki
 */
  pobierzPosiłki() {
    this.kaloriePosilkow = 0.0;
    this.apiService.pobierzPosilki(sessionStorage.getItem('id')).subscribe(res => {
      this.posilki = res['data'] != null ?
        res['data'].filter(x => new Date(x.date).toDateString() == this.date.toDateString())
          .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }) : null;
      if (this.posilki == null || this.posilki.length == 0) {
        this.realizacjaProcent = 0;
        this.realizacjaTytul = this.kaloriePosilkow + '/' + this.bmr + ' kcal';
        this.changeDetector.markForCheck();
      }
      else {
        this.posilki.forEach(x => {
          this.pobierzSzczegoly(x);
        });
      }
    });
  }
  /**
 * Metoda obliczająca kalorię posiłku
 */

  obliczKaloriePosilku(posilek) {
    let kalorie = 0.0;
    posilek['ingredients'].forEach(skladnik => {
      kalorie = this.sumujKalorie(skladnik, kalorie);
    });
    posilek['kalorie'] = kalorie;
    this.kaloriePosilkow += kalorie;
    this.realizacjaProcent = (this.kaloriePosilkow / this.bmr) * 100;
    this.realizacjaTytul = this.kaloriePosilkow.toFixed(0) + '/' + this.bmr.toFixed(0) + ' kcal';
    this.changeDetector.markForCheck();
  }

  /**
 *Metoda sumująca kalorię
 */
  sumujKalorie(x, sum) : number{
    if (x['quantity'] != "0")
      sum += (Number.parseFloat(x['quantity']) * Number.parseFloat(x['energy'])) / 100;
    else {
      sum += x['energy'];
    }
    return sum;
  }
/**
 * Metoda umożliwiająca wybranie przepisu
 */
  WybierzPrzepis(przepis) {
    this.wybranyPrzepis = przepis;
    this.wybraneSKladniki = null;
    this.apiService.pobierzPrzepis(this.wybranyPrzepis.id_recipe).subscribe(result => {
      let sum = 0;
      result['data'].forEach(x => {
        sum = this.sumujKalorie(x, sum);
      });
      this.formGroup.controls.gramatura.patchValue(sum);
    });
  }

  /**
 * Metoda umożliwiająca dodanie składniku w posiłku
 */
  DodajSkladnik() {
    if (this.formGroup.controls.quantity.value == '' || this.formGroup.controls.number.value == '') {
      this.message.setAutohiddenMessage("Ilość lub gramatura muszą być wypełnione");
    }
    else {
      if (this.wybraneSKladniki == null) {
        this.wybraneSKladniki = [];
      }

      this.wybraneSKladniki.push({
        skladnik: this.wybranySkladnik,
        quantity: this.formGroup.controls.quantity.value,
        number: this.formGroup.controls.number.value,
      });
      
      let obj = {
        'quantity': this.formGroup.controls.quantity.value,
        'energy': this.wybranySkladnik['energy'],
      };
      this.formGroup.controls.gramatura.patchValue(this.sumujKalorie(obj, this.formGroup.controls.gramatura.value == null ? 0 : this.formGroup.controls.gramatura.value));
      this.formGroup.controls.quantity.patchValue('');
      this.formGroup.controls.number.patchValue('');
      this.message.setMessage(null);

      this.wybranySkladnik = null;
    }
  }

/**
 *Metoda pozwalająca na wybór składnika
 */
  WybierzSkladnik(skladnik) {
    this.wybranySkladnik = skladnik;
    this.wybranyPrzepis = null;
  }
/**
 *Metoda pozwalająca usunąć wcześniej dodany składnik z posiłku 
 */
  usunSkladnik(skladnik) {
    this.wybraneSKladniki = this.wybraneSKladniki.filter(x => x != skladnik);
    console.log(this.wybraneSKladniki);
    let kalorie = 0;
    this.wybraneSKladniki.forEach(i => {
      let obj = {
        'quantity': i.quantity,
        'energy': i.skladnik['energy'], 
      };
      kalorie = this.sumujKalorie(obj, kalorie);
    });
    this.formGroup.controls.gramatura.patchValue(kalorie);
  }

  /**
 *Metoda z walidacją pół oraz możliwością zapisu posiłku
 */
  Zapisz() {
    if (!this.formGroup.valid && (this.wybranyPrzepis == null || this.wybraneSKladniki == null)) {
      this.message.setAutohiddenMessage("Nie wszystkie pola zostały wypełnione poprawnie!");
      return;
    }

    let newDate = new Date(this.datePicker.year, this.datePicker.month, this.datePicker.day, this.czas.hour, this.czas.minute);
    let model = {};
    if (this.wybranyPrzepis != null) {
      if (this.formGroup.controls.gramatura.value == null || this.formGroup.controls.gramatura.value == '' || this.formGroup.controls.gramatura.value == '0') {
        this.message.setAutohiddenMessage("Gramatura jest wymagana!");
        return;
      }

      model = {
        who: sessionStorage.getItem('id'),
        meal_name: this.formGroup.controls.nazwa.value,
        date: this.date.getFullYear() + "-" +
          ("0" + (newDate.getMonth())).slice(-2) + "-" +
          ("0" + newDate.getDate()).slice(-2) + " " +
          ("0" + newDate.getHours()).slice(-2) + ":" +
          ("0" + newDate.getMinutes()).slice(-2) + ":00",
        recipe: this.wybranyPrzepis.id_recipe,
        status: 0
      };
      this.wybranyPrzepis = null;
    }
    else if (this.wybraneSKladniki != null) {
      model = {
        who: sessionStorage.getItem('id'),
        meal_name: this.formGroup.controls.nazwa.value,
        date: this.date.getFullYear() + "-" +
          ("0" + (newDate.getMonth())).slice(-2) + "-" +
          ("0" + newDate.getDate()).slice(-2) + " " +
          ("0" + newDate.getHours()).slice(-2) + ":" +
          ("0" + newDate.getMinutes()).slice(-2) + ":00",
        status: 0
      };

      model['id_ingredient'] = new Object();
      model['quantity'] = new Object();
      model['id_unit'] = new Object();
      for (let i = 0; i < this.wybraneSKladniki.length; i++) {
        model['id_ingredient'][(i + 1).toString()] = Number.parseInt(this.wybraneSKladniki[i].skladnik.ID.toString())
        model['quantity'][(i + 1).toString()] = this.wybraneSKladniki[i].quantity;
        model['id_unit'][(i + 1).toString()] = this.wybraneSKladniki[i]./*number*/quantity;
      }
      this.wybraneSKladniki = null;
    }

    this.apiService.dodajPosilek(model).subscribe(res => {
      this.message.setAutohiddenMessage(res['Message']);
      this.pobierzPosiłki();
      if (res['Message'].toLocaleLowerCase().includes('dodano')) {
        // this.czyPrzyciskDodajPosilekAktywny = false;
        // this.formGroup.reset();
        this.ResetujFormularz();
        this.currentStep = 0;
        document.getElementById('close-modal').click();
      }
    },
      err => {
        this.message.setAutohiddenMessage("Nie dodano posiłku");
      });

    this.changeDetector.markForCheck();
  }

  FormatujCzas(date: Date) {
    return ("0" + date.getHours()).slice(2) + ':' + ("0" + date.getMinutes()).slice(2);
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['date'] != null && changes['date'] != undefined) {
      this.kaloriePosilkow = 0;
      this.realizacjaProcent = 0;
      this.planProcent = 100;
      this.pobierzPosiłki();
    }
  }

  Usun() {
    this.UsunPosilek(this.WybranyPosilek);
  }

  UsunPosilek(posilek) {
    this.apiService.usunPosilek(sessionStorage.getItem('id'), posilek.id_meal).subscribe(res => {
      this.pobierzPosiłki();
    });
  }

  ResetujFormularz() {
    this.czyPrzyciskDodajPosilekAktywny = true;
    this.message.setMessage(null);
    this.formGroup.reset();
    let current = new Date();
    this.czas = { hour: current.getHours(), minute: current.getMinutes() };
  }
}
