import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angular5-social-login';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendClientService } from '../_shared/backend-client.service';
import { ExtendedStorageService } from '../_shared/extended-storage.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css'],
  providers: [
    MessageService
  ]
})
export class RejestracjaComponent implements OnInit {
  /**
   *  Rejestracja nowego użytkownika z walidacją pól, 
   * zmuszenie do zapoznania użytkownika z regulaminem, wybor loginy (email) oraz hasla
   */
  @ViewChild('content') content;

  constructor(private apiService: BackendClientService, private router: Router, private socialAuthService: AuthService, private modalService: NgbModal, private message: MessageService) { }


  public form: FormGroup;
  oldObject = null;
  czyAktywny: boolean = false;
  czyZarejestrowano: boolean = null;
  // message: string = '';
  bladWalidacjiEmail: boolean = false;

  zmienAktywnosc() {
    this.czyAktywny = !this.czyAktywny;
  }

  rejestracja() {
    let uzytkownik = new Uzytkownik();

    uzytkownik.email = this.form.controls.email.value;
    uzytkownik.name = this.form.controls.name.value;
    uzytkownik.pass = this.form.controls.pass.value;
    uzytkownik.pass2 = this.form.controls.pass2.value;

    this.apiService.zarejestrujUzytkownika(uzytkownik).subscribe(
      result => {
        if (result["Message"] != "Błąd walidacji" && result['Message'] != "Email zajęty") {
          this.czyZarejestrowano = true;
          this.modalService.open(this.content, { centered: true });
          this.form.reset();
        }
        else if  (result['Message'] == "Email zajęty") {
          this.bladWalidacjiEmail = true;
        }
        else {
          this.czyZarejestrowano = false;
          this.message.setAutohiddenMessage("Brak wymaganych danych!");
        }
      },
      error => {
        this.czyZarejestrowano = false;
        this.message.setAutohiddenMessage(error.error);

      },
      () => {
        // ...
      }
    );
  }
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

  zalogujPrzezFacebooka(model) {
    this.apiService.zalogujPrzezSocialMedia(model).subscribe(result => {
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


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(),
      email: new FormControl('', Validators.email),
      pass: new FormControl('', [Validators.required, PasswordValidation.strong]),
      pass2: new FormControl('')
    },
      {
        validators: PasswordValidation.MatchPassword
      });
  }

  show(id) {
    document.getElementById(id).attributes["type"].value = 'text';
  }

  hide(id) {
    document.getElementById(id).attributes["type"].value = 'password';
  }
}
export class Uzytkownik {
  public name: string;
  public email: string;
  public pass: string;
  public pass2: string;
}

export class PasswordValidation {
  static strong(control: FormControl) {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);


    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      // return what´s not valid
      return { strong: true };
    }
    return null;
  }
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('pass').value; // to get value in input tag
    let confirmPassword = AC.get('pass2').value; // to get value in input tag
    if (password != confirmPassword && password != '' && confirmPassword != '') {
      AC.get('pass2').setErrors({ MatchPassword: true })
    } else {
      return null
    }

  }
}
