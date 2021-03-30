import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-przypomnij-haslo',
  templateUrl: './przypomnij-haslo.component.html',
  styleUrls: ['./przypomnij-haslo.component.css']
})
export class PrzypomnijHasloComponent implements OnInit {
/**
   * Przestarzały komponent, nie użyty w końcowej wersji strony
   */
  form: FormGroup;
  constructor() { }

  ngOnInit() {


    this.form = new FormGroup({
      email: new FormControl('', Validators.email)
    })
  }

}
