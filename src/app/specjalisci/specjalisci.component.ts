import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendClientService } from '../_shared/backend-client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExtendedStorageService } from '../_shared/extended-storage.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-specjalisci',
  templateUrl: './specjalisci.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./specjalisci.component.css'],
  providers: [
    MessageService
  ]
})
export class SpecjalisciComponent implements OnInit {

  szukaj: string = '';
  specialisciWszyscy: Specialisci[] = null;
  specialisciPrzefiltrowani: Specialisci[] = null;
  form:  FormGroup = null;
  wyslijDisabled: boolean = true;
  // message: string = null;

  /**
   * Pobranie rekordów specjalistow oraz przypisanie ich do przygotowanego widoku
   */
  constructor(private modalService: NgbModal,
              private apiService: BackendClientService,
              private message: MessageService) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  ngOnInit() {
    this.Pobierz();

    // this.form = new  FormGroup({
    //   firstname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    //   lastname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
    //   education: new FormControl('', [Validators.required]),
    //   experience: new  FormControl('', [Validators.required]),
    //   specialization: new FormControl('', [Validators.required])
    // });
  }

  // initializeFormGroup(){
  //   this.form.patchValue({
  //     lastname: '',
  //     education: '',
  //     experience: '',
  //     specialization: ''
  //   });
  // }

/**Metoda pobierająca specjalistów */
  Pobierz()  {
    this.apiService.pobierzSpecialistow().subscribe(result => {
      this.specialisciWszyscy = result['data'];
      this.Filtruj();
      // for(let i of this.specialisciWszyscy){
      // }
    });
  }

  Filtruj() {
    this.specialisciPrzefiltrowani = this.specialisciWszyscy.filter(x => x['name'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase()) || x['surname'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase()) || x['profession'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase())  || x['specialization'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase()));
  }
/** Metoda dodająca specjalistów */
  Dodaj()  { //Patrycja spojrz na metode czysc() czy wszystko ok bo byla zakomentowana
    let specialista = this.specialisciWszyscy.find(x => x.email == sessionStorage.getItem('email'));
    if (specialista != null) {
      this.message.setAutohiddenMessage("Jesteś już specialistą!");
      this.czysc();
      return;
    }

    if (this.form.valid) {
      let model = {
        // id: sessionStorage.getItem('id'),
        id: this.form.controls.id.value,
        name: this.form.controls.name.value,
        surname: this.form.controls.surname.value,
        email: this.form.controls.email.value,
        profession: this.form.controls.profession.value,
        specialization: this.form.controls.specialization.value,
        picture : this.form.controls.picture .value,
      };
      this.apiService.dodajSpecialiste(model).subscribe(res => {
        this.message.setAutohiddenMessage(res['Message']);
        this.Pobierz();
      })
    }
    else {
      this.message.setAutohiddenMessage("Nie wszystkie dane zostały prawidłowo wypełnione!");
    }
  }
  czysc(){
    this.form.reset();
    // this.initializeFormGroup();
    this.form.controls.lastname.setErrors(null);
    this.form.controls.education.setErrors(null);
    this.form.controls.experience.setErrors(null);
    this.form.controls.specialization.setErrors(null);
  }
  Contact(specialista: Specialisci) {
    this.message.setMessage("Trwa wysyłanie maila!");
    document.getElementById('open-modal-sp').click();

    let userData = ExtendedStorageService.pobierzDaneUzytkownika();
    let obj = {
      specialist_email: specialista.email,
      first_name: userData.name,
      user_email: userData.email,
    };

    this.apiService.wyslijMailaDoSpecialisty(obj).subscribe(res => {
      this.message.setMessage(res['Message']);
    },
    err => {
      this.message.setMessage("Błąd podczas wysyłania maila!");
    },
    () => {
      document.getElementById('open-modal-sp').click();
    });
  }
}

export interface Specialisci {
        id: number;
        name: string;
        surname: string;
        email: string;
        profession: string;
        specialization: string;
        picture: string;
}
