import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidation } from '../rejestracja/rejestracja.component';
import { BackendClientService } from '../_shared/backend-client.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-zmiana-hasla',
  templateUrl: './zmiana-hasla.component.html',
  styleUrls: ['./zmiana-hasla.component.css'],
  providers: [
    MessageService
  ]
})
export class ZmianaHaslaComponent implements OnInit {

  /**
   * Konstruktor klasy, która jest komponente obsługującym widok zmiany hasła przez użytkownika
   */
  constructor(private apiService: BackendClientService, private message: MessageService) { }

  public form: FormGroup;
  // message: string = null;

  ngOnInit() {
    this.form = new FormGroup({
      old_pass: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      pass2: new FormControl('', [Validators.required, PasswordValidation.strong]),
    },
    {
      validators: PasswordValidation.MatchPassword
    });

    
    this.form.valueChanges.subscribe(val => {
      if (!this.form.valid && val.old_pass != '' && val.pass != '' && val.pass2 != '') {
        this.message.setAutohiddenMessage("Dane nie zostały wypełnione prawidłowo!");
      }
      else {
        this.message.setAutohiddenMessage(null);
      }
    })
  }
/**Metoda zmień hasło */
  ZmienHaslo() {
    if (this.form.valid) {
      let model = new ZmianaHaslaModel();
      model.old_pass = this.form.controls.old_pass.value;
      model.new_pass = this.form.controls.pass.value;
      model.new_pass2 = this.form.controls.pass2.value;
      model.id = sessionStorage.getItem('id');

      this.apiService.zmienHaslo(model).subscribe(
        result => {
          this.message.setAutohiddenMessage(result['Message']);
        },
        error => {
          this.message.setAutohiddenMessage(error.error);
        },

      )
    }
    else {
      this.message.setAutohiddenMessage("Dane nie zostały wypełnione prawidłowo!");
    }
  }

  show(id) {
    document.getElementById(id).attributes["type"].value = 'text';
  }

  hide(id) {
    document.getElementById(id).attributes["type"].value = 'password';
  }
}

export class ZmianaHaslaModel {
  old_pass: string;
  new_pass: string;
  new_pass2: string;
  id: string;
}