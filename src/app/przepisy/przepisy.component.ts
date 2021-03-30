import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-przepisy',
  templateUrl: './przepisy.component.html',
  styleUrls: ['./przepisy.component.css']
})
export class PrzepisyComponent implements OnInit {
  /**
   * Odnośnik do przepisy wyświetlanie, możliwosć wyszukiwania przepisu
   */

  public form: FormGroup;
  public szukaj: string;
  constructor() { }

  wyszukajPrzep(){
    this.szukaj = this.form.controls.szukaj.value;
  }

  ngOnInit() {
    this.form = new FormGroup({
      szukaj: new FormControl()
    });
   
  }

}
