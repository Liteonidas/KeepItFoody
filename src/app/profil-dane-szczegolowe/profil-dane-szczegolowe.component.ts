import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BackendClientService } from '../_shared/backend-client.service';
import { ExtendedStorageService } from '../_shared/extended-storage.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-profil-dane-szczegolowe',
  templateUrl: './profil-dane-szczegolowe.component.html',
  styleUrls: ['./profil-dane-szczegolowe.component.css'],
  providers: [
    MessageService
  ]
})
export class ProfilDaneSzczegoloweComponent implements OnInit, OnChanges {
  /**
   * Możliwość dodania zmiany danych przez użytkownika
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.przeliczycBMR) {
      this.obliczBMR();
    }
  }

  options: any[] = [
    { key: 'K', name: 'Kobieta'},
    { key: 'M', name: 'Mężczyzna'},
    { key: 'N', name: 'Nie podano'},
  ];
  selectedSex;
  selectedLifestyle = null;
  Kwspolczynniki = [1.2, 1.3, 1.5, 1.6, 1.9, 2.2];
  Mwspolczynniki = [1.2, 1.3, 1.6, 1.7, 2.1, 2.4];
  czyWszystkieDaneWypelnione: boolean = false;
  heightError: boolean = false;
  weightError: boolean = false

  @Input() model: any;
  @Input() przeliczycBMR: boolean;
  @Output() przeliczBMR = new EventEmitter<boolean> ();
    // message: any = null;

  constructor(private apiService: BackendClientService, private message: MessageService) { }

  public form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      height : new FormControl(this.model.height != "null" && this.model.height !== "undefined" ? parseInt(this.model.height) : ''),
      weight : new FormControl(this.model.weight != "null" && this.model.weight !== "undefined" ? parseFloat(this.model.weight).toFixed(2) : ''),
      lifestyle : new FormControl(this.model.lifestyle !== "null" && this.model.lifestyle !== "undefined" ? this.model.lifestyle : ''),
      bmr: new FormControl({ value: '', disabled: true})
    });

    let niedozwoloneWartosci = [null, undefined, '', 'u'];
    if (!niedozwoloneWartosci.includes(this.model.sex))
    {
      this.selectedSex = this.options.find(x => x.key == this.model.sex);
      this.options = this.options.filter(x => x != this.options[2]);
    }
    else
    {
      this.selectedSex = this.options[2];
    }
    this.selectedLifestyle = this.model.lifestyle;
    this.options = this.options.filter(x => x.key != this.selectedSex.key);

    this.obliczBMR();

    this.form.get('height').valueChanges.subscribe(val => {
      if (val < 0) {
        this.form.controls.height.patchValue(Math.abs(val));
      }
      else {
        sessionStorage.setItem('height', val);
        this.obliczBMR();
      }

      this.heightError = val < 50 || val > 250;
    });

    this.form.get('weight').valueChanges.subscribe(val => {
      if (val < 0) {
        this.form.controls.weight.patchValue(Math.abs(val));
      }
      else {
        sessionStorage.setItem('weight', val);
        this.obliczBMR();
      }

      this.weightError = val < 2 || val > 300;
    });

    this.CzyWszystkieDaneWypelnione();
  }

  CzyWszystkieDaneWypelnione() {
    this.form.valueChanges.subscribe(x => {
      this.czyWszystkieDaneWypelnione = x.weight == null || x.height == null || x.lifestyle == null || this.selectedSex == null;
    });
  }

  ZapisDanych(){
    let model = new ZapisDanychModel();
    model.height =  this.model.height;
    model.new_height = this.form.controls.height.value;
    model.weight =  this.model.weight;
    model.new_weight =   Number.isInteger(this.form.controls.weight.value) ? this.form.controls.weight.value + 0.00001 : this.form.controls.weight.value;
    model.email = this.model.email; //bo inaczej nie dziala
    model.name = this.model.name;
    model.date_birth = sessionStorage.getItem('date_birth');
    model.sex = sessionStorage.getItem('sex');
    model.lifestyle = this.selectedLifestyle;

    this.apiService.aktualizujDaneUzytkownika(model).subscribe(
      result =>{
        this.message.setAutohiddenMessage(result['Message']);
        // ExtendedStorageService.aktualizujDanePodstawowe(model);
        ExtendedStorageService.aktualizujDaneSzczegolowe(model);
        this.obliczBMR();
      },
      error =>{
        this.message.setAutohiddenMessage(error.error);
      },
    );
  }

  sexWasChange(sex) {
    sessionStorage.setItem('sex', sex);
    this.obliczBMR();
  }

  lifestyleWasChange(lifestyle) {
    this.selectedLifestyle = lifestyle;
  }

  obliczBMR() {
    let bmr = 0
    this.apiService.pobierzWodeIBMR(ExtendedStorageService.pobierzDaneUzytkownika().id).subscribe(res => {
      bmr = res['bmr'];
    },
    err => {
      bmr = 0;
    },
    () => {
      this.form.controls.bmr.patchValue(bmr == null ? '' : bmr.toFixed(0));
    });
  }

  wiek() {
    let now = new Date();
    let birth = new Date(sessionStorage.getItem('date_birth')); //new Date(this.model.date_birth);
    return now.getFullYear() - birth.getFullYear();
  }
}

export class ZapisDanychModel{
  email: string;
  date_birth: string;
  name: string;
  height: number;
  new_height: number;
  weight: number;
  new_weight: number;
  sex: string;
  new_sex: number;
  lifestyle: number;
  new_lifestyle: string;
  //alergeny: ;
  bmr: number;
}
