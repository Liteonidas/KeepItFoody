import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BackendClientService } from '../_shared/backend-client.service';


@Component({
  selector: 'app-dodaj-skladnik',
  templateUrl: './dodaj-skladnik.component.html',
  styleUrls: ['./dodaj-skladnik.component.css']
})
export class DodajSkladnikComponent implements OnInit {

  public forms: FormGroup;
  public Message: string = null;
/**
   * Możliwość dodania nieistniejącego w bazie składnika 
   */
  constructor(private apiService: BackendClientService, private  router: Router) { }

  ngOnInit() {
    this.forms = new FormGroup({
      nazwa: new FormControl(),
      kategoria: new FormControl(),
      kalorycznosc: new FormControl('',Validators.min(0)),
      bialka: new FormControl(),
      weglowodany: new FormControl(),
      tluszcze: new FormControl(),
      blonnik: new FormControl(),
      sol: new FormControl(),
      // opis: new FormControl(),
      gluten: new FormControl(),
      laktoza: new FormControl()

    });
    this.forms.valueChanges.subscribe(val =>  {
      if  (val.kalorycznosc< 0.0) {
        this.forms.controls.kalorycznosc.patchValue(Math.abs(val.kalorycznosc), {emitEvent: false});
      }
    })

    this.forms.valueChanges.subscribe(val =>  {
      if  (val.bialka< 0.0) {
        this.forms.controls.bialka.patchValue(Math.abs(val.bialka), {emitEvent: false});
      }
    })

    this.forms.valueChanges.subscribe(val =>  {
      if  (val.weglowodany< 0.0) {
        this.forms.controls.weglowodany.patchValue(Math.abs(val.weglowodany), {emitEvent: false});
      }
    })

    this.forms.valueChanges.subscribe(val =>  {
      if  (val.tluszcze< 0.0) {
        this.forms.controls.tluszcze.patchValue(Math.abs(val.tluszcze), {emitEvent: false});
      }
    })

    this.forms.valueChanges.subscribe(val =>  {
      if  (val.blonnik< 0.0) {
        this.forms.controls.blonnik.patchValue(Math.abs(val.blonnik), {emitEvent: false});
      }
    })

    this.forms.valueChanges.subscribe(val =>  {
      if  (val.sol< 0.0) {
        this.forms.controls.sol.patchValue(Math.abs(val.sol), {emitEvent: false});
      }
    })

  }
/** Metoda dodająca składnik */
  dodaj() {
    let skl = new DodajSKladnikModel();

    skl.name = this.forms.controls.nazwa.value;
    skl.category = this.forms.controls.kategoria.value;
    skl.energy = this.forms.controls.kalorycznosc.value + (Number.isInteger(this.forms.controls.kalorycznosc.value) ? 0.0001 : 0);
    skl.protein = this.forms.controls.bialka.value + (Number.isInteger(this.forms.controls.bialka.value) ? 0.0001 : 0);
    skl.carbohydrates = this.forms.controls.weglowodany.value + (Number.isInteger(this.forms.controls.weglowodany.value) ? 0.0001 : 0);
    skl.fats = this.forms.controls.tluszcze.value + (Number.isInteger(this.forms.controls.tluszcze.value) ? 0.0001 : 0);
    skl.fibre = this.forms.controls.blonnik.value + (Number.isInteger(this.forms.controls.blonnik.value) ? 0.0001 : 0);
    skl.salt = this.forms.controls.sol.value + (Number.isInteger(this.forms.controls.sol.value) ? 0.0001 : 0);
    skl.description = ""; //this.forms.controls.opis.value;
    skl.gluten = this.forms.controls.gluten.value ? 1 : 0;
    skl.lactose = this.forms.controls.laktoza.value ? 1 : 0;

    if (skl.energy >= 0 && skl.protein >= 0 && skl.carbohydrates >= 0 && skl.fats >= 0 && skl.fibre >= 0 && skl.salt >= 0) {

      this.apiService.dodajSkladnik(skl).subscribe(
        res => {
          this.Message = res['Message'];
        },
        error => {
          this.Message = "Przesłano nieprawidłowe dane!";
        }
      );
    } else {
      this.Message = "Podaj wartości dodatnie!";
    }
  }
}

export class DodajSKladnikModel {
  ID?: number;
  name?: string;
  category?: string;
  energy?: number;
  protein?: number;
  carbohydrates?: number;
  fats?: number;
  fibre?: number;
  salt?: number;
  description?: string;
  gluten?: number;
  lactose?: number;

}
