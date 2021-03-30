import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BackendClientService } from '../_shared/backend-client.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-dodaj-posilek',
  templateUrl: './dodaj-posilek.component.html',
  styleUrls: ['./dodaj-posilek.component.css']
})
export class DodajPosilekComponent implements OnInit {

  
  isLinear = false;
  currentStep: number = 0;
  formGroup: FormGroup = null;
/**
   *Klasa przestarzała
   */
  constructor(private apiService: BackendClientService, private message: MessageService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      nazwa: new FormControl('', Validators.required),
      szukajPrzepisu: new FormControl(''),
      gramatura: new FormControl(''),
      szukajSkladnika: new FormControl(''),
      quantity: new FormControl('', [Validators.max(10000), Validators.min(0)]),
      number: new FormControl('', [Validators.max(10000), Validators.min(0)])
    });

    this.formGroup.get('quantity').valueChanges.subscribe(val => {
      if (val < 0) {
        this.formGroup.controls.quantity.patchValue(Math.abs(val));
      }
      else if  (val != 0 && val != null){
        this.formGroup.controls.number.patchValue(null, { emitEvents: false });
      }
    });

    this.formGroup.get('number').valueChanges.subscribe(val => {
      if (val < 0) {
        this.formGroup.controls.number.patchValue(Math.abs(val));
      }
      else if  (val != 0 && val != null){
        this.formGroup.controls.quantity.patchValue(null, { emitEvents: false });
      }
    });
  }

  Next() {
    if (this.currentStep == 4) {}
    else {
      this.currentStep++;
      document.getElementById('step-' + (this.currentStep + 1)).click();
    }

  }
  Prev(){
    if (this.currentStep == 0) {
      (<any>document.getElementsByClassName('close')[0]).click();
    }
    else {
        this.currentStep--;
        document.getElementById('step-' + (this.currentStep + 1)).click();
      }
  }
  // klik(){
  //   let elem: HTMLElement = document.getElementById('posWlasny');
  //   setStyleAttribute(elem, {font-size:'12px', color : 'red' , margin-top: '5px'});
  // }

}
