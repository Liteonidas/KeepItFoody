import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';
import { BackendClientService } from '../_shared/backend-client.service';
import { ExtendedStorageService } from '../_shared/extended-storage.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css'],
  providers: [
    MessageService
  ]
})
export class LogowanieComponent implements OnInit {
  /**
   * logowanie do sytemu na podstawie emaila+hasło, walidacja pól
   */

  constructor(private apisService: BackendClientService,
    private router: Router,
    private message: MessageService,
    private socialAuthService: AuthService) { }


  public form: FormGroup;
  czyZalogowano: boolean = null;
  // message: string = null;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.email),
      pass: new FormControl('', Validators.required),
    });
  }
/** Metoda pozwalająca logowanie */
  logowanie() {
    let model = new LogowanieModel();

    model.email = this.form.controls.email.value;
    model.pass = this.form.controls.pass.value;

    this.apisService.zalogujIPobierzDaneUzytkownika(model).subscribe(
      result => {
        if (result['Message'] != 'Zalogowano.') {
          this.czyZalogowano = false;
          this.message.setAutohiddenMessage('Nieprawidłowy email bądź hasło!');
        }
        else {
          ExtendedStorageService.przekazDaneLogowanaDoCache(result);
          this.czyZalogowano = true;
          if (result['isadmin'] == "1") {
            this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/kalendarz/' + new Date()]);
          }
        }

      },
      error => {
        this.czyZalogowano = false;
        this.message.setAutohiddenMessage(error.error);
      },
      () => {
        // ...
      }
    );
  }
/** Metoda glówna logowania przez social media */
  logowaniePrzezSocialMedia(isFacebook: boolean = false) {
    let socialPlatformProvider = isFacebook ? FacebookLoginProvider.PROVIDER_ID : GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        let model = {
          email: userData.email,
          first_name: userData.name.split(' ')[0],
        };
        if (userData.image != null && userData.image != undefined && userData.image != ''){
          this.PobierzZdjecie(userData.image, model);
        }
        else {
          this.zalogujPrzezFacebooka(model);
        }
      });
  }

  /**Metoda pobierająca zdjęcie z social Media */
  PobierzZdjecie(inputValue: any, model): void {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", inputValue);
    xhr.responseType = "blob";
    let context = this;
    xhr.onload = () =>
    {
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        let resultArray = (myReader.result as string).split(',');
        model['photo'] = resultArray[resultArray.length - 1];
        context.zalogujPrzezFacebooka(model);
      }
      myReader.readAsDataURL(xhr.response);
    }
    xhr.send();
  }
/** Metoda umożliająca zalogowanie przez facebooka */
  zalogujPrzezFacebooka(model) {
    this.apisService.zalogujPrzezSocialMedia(model).subscribe(result => {
      ExtendedStorageService.przekazDaneLogowanaDoCache(result);
      if (result['isadmin'] == "1") {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/kalendarz/' + new Date()]);
      }
    },
      err => {
        this.message.setAutohiddenMessage('Błędne dane logowania');
      });
  }

  /** Metoda pokazująca haslo*/
  show() {
    document.getElementById('passId').attributes["type"].value = 'text';
  }
  /** Metoda ukrywająca hasło  */

  hide() {
    document.getElementById('passId').attributes["type"].value = 'password';
  }
}

export class LogowanieModel {
  email: string;
  pass: string;
}
