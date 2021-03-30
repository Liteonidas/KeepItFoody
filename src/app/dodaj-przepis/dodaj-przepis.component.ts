import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Skladniki } from '../skladniki-wyswietlanie/skladniki-wyswietlanie.component';
import { BackendClientService } from '../_shared/backend-client.service';
import { Router } from '@angular/router';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-dodaj-przepis',
  templateUrl: './dodaj-przepis.component.html',
  styleUrls: ['./dodaj-przepis.component.css'],
  providers: [
    MessageService
  ]
})
export class DodajPrzepisComponent implements OnInit {


  public form: FormGroup;
  public smallForm: FormGroup;
  private oldSzukaj: string = null;
  private przefiltrowaneSkladniki: Skladniki[] = null;
  private skladniki: Skladniki[] = null;
  private wybraneSkladniki: WybranySkladnik[] = null;
  private photo: string = null;
  private preview: string = null;
  private skladnik: Skladniki = null;
  // private message: string = null;
  // private message1: string = null;
  // private messagesucces: string = null;

  /**
   * Możliwość dodania przepisu: z istniejących składników, odniesienie do stworzenia nowego składniku,
   * walidacja wszystkich pól, opcjonalny opis.
   */
  constructor(private apiService: BackendClientService, private router: Router, private message: MessageService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      prepare: new FormControl('', Validators.required),
      preparing_time: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
    });

    this.smallForm = new FormGroup({
      szukaj: new FormControl(),
      quantity: new FormControl('', [Validators.max(10000), Validators.min(0)]),
      weight: new FormControl('', [Validators.max(10000), Validators.min(0)]),
    })

    this.apiService.pobierzSkladniki().subscribe(
      res => {
        this.skladniki = res['data'].filter(x => x.name.toUpperCase()).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
    );

    this.smallForm.valueChanges.subscribe(val => {
      if (val.szukaj != null) {
        this.przefiltrowaneSkladniki = this.skladniki.filter(x => x.name.toUpperCase().includes(val.szukaj.toUpperCase())).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      }
      else {
        this.przefiltrowaneSkladniki = null;
      }
    })

    this.form.valueChanges.subscribe(val =>  {
      if  (val.preparing_time< 0.0) {
        this.form.controls.preparing_time.patchValue(Math.abs(val.preparing_time), {emitEvent: false});
      }
    })

    this.smallForm.get('quantity').valueChanges.subscribe(val => {
      if (val < 0) {
        this.smallForm.controls.quantity.patchValue(Math.abs(val));
      }
      else if  (val != 0 && val != null){
        this.smallForm.controls.weight.patchValue(null, { emitEvents: false });
      }
    });

    this.smallForm.get('weight').valueChanges.subscribe(val => {
      if (val < 0) {
        this.smallForm.controls.weight.patchValue(Math.abs(val));
      }
      else if  (val != 0 && val != null){
        this.smallForm.controls.quantity.patchValue(null, { emitEvents: false });
      }
    });
  }

  /**Metoda umożliwiająca dodanie składnika */
  dodajskladnik() {
    if (this.smallForm.valid && (this.smallForm.controls.quantity.value != null || this.smallForm.controls.weight.value != null) && this.skladnik != null) {
      if (this.wybraneSkladniki == null || this.wybraneSkladniki == undefined)
        this.wybraneSkladniki = [];
      this.wybraneSkladniki.push({
        skladnik: this.skladnik,
        quantity: this.smallForm.controls.quantity.value == null ? 0 : this.smallForm.controls.quantity.value,
        weight: this.smallForm.controls.weight.value == null ? 0 : this.smallForm.controls.weight.value
      });
    }
    else {
      this.message.setAutohiddenMessageByKey('message',"Podaj jedną z wartości pól!");
    }

  }
/** Metoda pozwająca usunąć składnik */
  usunSkladnik(wybranySkladnik) {
    this.wybraneSkladniki = this.wybraneSkladniki.filter(x => x != wybranySkladnik);
  }
/** Metoda pozwająca zapisać przepis */
  zapisz() {
    if (this.form.valid && this.wybraneSkladniki != null && this.photo != null) {
      let przep = new DodPrzep();
      przep.recipe_name = this.form.controls.name.value;
      przep.prepare = this.form.controls.prepare.value;
      przep.preparing_time = Number.parseInt(this.form.controls.preparing_time.value);
      przep.difficulty = Number.parseInt(this.form.controls.difficulty.value);
      if (this.wybraneSkladniki != null && this.wybraneSkladniki != undefined) {
        przep.id_ingredient = new Object();
        przep.quantity = new Object();
        przep.id_unit = new Object();
        for (let i = 0; i < this.wybraneSkladniki.length; i++) {
          przep.id_ingredient[(i + 1).toString()] = Number.parseInt(this.wybraneSkladniki[i].skladnik.ID.toString())
          przep.quantity[(i + 1).toString()] = this.wybraneSkladniki[i].quantity;
          przep.id_unit[(i + 1).toString()] = this.wybraneSkladniki[i]./*weight*/quantity;
        }
      }
      przep.id_user = Number.parseInt(sessionStorage.getItem("id"));
      przep.photo = this.photo;

      this.apiService.dodajPrzepis(przep).subscribe(res => {
        this.message.setAutohiddenMessageByKey('message1', res['Message']);

        if (this.message.contents['message1'].includes('bazy'))
          this.router.navigate(['/przepisy']);
      },
      error => {
        this.message.setAutohiddenMessageByKey('message1', "Nie dodano do bazy");
      });
    }
    else {
      this.message.setAutohiddenMessageByKey('message1', "Nie prawidłowo uzupełnione dane");
    }
  }
/** Metoda wybierająca składnik */
  WyborSkladnika(skladnik) {
    this.skladnik = skladnik;
  }
/** Metoda wywoływana w przypadku gdy zmieni się stan kontrolki*/
  changeListener($event): void {
    this.readThis($event.target);
  }

  /** Metoda odczytująca zdjęcie */
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    if (file.size > 2097152)
    {
      this.message.setAutohiddenMessageByKey('message1', 'Zdjęcie za duże!');
    }else{

    myReader.onloadend = (e) => {
      this.preview = myReader.result as string;
      let resultArray = (myReader.result as string).split(',');
      this.photo = resultArray[resultArray.length - 1];
    }
    this.message.setMessageByKey('message1', null);
    this.message.setAutohiddenMessageByKey('messagesucces', "Zdjęcie dodane poprawnie!");
    myReader.readAsDataURL(file);
  }
}
}
export class DodPrzep {
  recipe_name: string;
  prepare: string;
  preparing_time: number;
  difficulty: number;
  id_ingredient: any;
  quantity: any;
  id_unit: any;
  id_user: number;
  photo: string;
}
export class WybranySkladnik {
  skladnik: Skladniki = null
  quantity: number = 0;
  weight: number = 0;
}
