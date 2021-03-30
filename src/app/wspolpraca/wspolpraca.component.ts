import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../_shared/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wspolpraca',
  templateUrl: './wspolpraca.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./wspolpraca.component.css'],
  providers: [
    MessageService
  ]
})
export class WspolpracaComponent implements OnInit {

  szukaj: string = '';
  specialisciWszyscy: any[] = null;
  specialisciPrzefiltrowani: any[] = null;
  form:  FormGroup = null;
  wyslijDisabled: boolean = true;
  private picture: string = null;
  private wysw: string = null;
  // message: string = null;

  /**
   * możliwość zostania specjalistą przez wypełnienie formularza. 
   * Weryfikacja wprowadzonych danych pod względem poprawności jak 
   * i sprawdzenie czy rekordy nie figurują w bazie
   */
  constructor(private modalService: NgbModal,
              private apiService: BackendClientService,
              private message: MessageService) { }

    ngOnInit() {
      this.Pobierz();

      this.form = new  FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$")]),
        surname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$")]),
        email: new FormControl('', [Validators.email]),
        profession: new FormControl('', [Validators.required]),
        // experience: new  FormControl('', [Validators.required]),^a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ
        specialization: new FormControl('', [Validators.required])
      });
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
      });
    }

    Filtruj() {
      this.specialisciPrzefiltrowani = this.specialisciWszyscy.filter(x => x['name'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase()) || x['last_name'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase()) || x['experience'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase())  || x['specialization'].toLocaleLowerCase().includes(this.szukaj.toLocaleLowerCase()));
    }
/** Metoda dodająca specjalistów */
    Dodaj()  { //Patrycja spojrz na metode czysc() czy wszystko ok bo byla zakomentowana
      let specialista = this.specialisciWszyscy.find(x => x.surname == sessionStorage.getItem('surname') && x.name == sessionStorage.getItem('name'));
      if (specialista != null) {
        this.message.setAutohiddenMessage("Jesteś już specialistą!");
        this.czysc();
        return;
      }

      if (this.form.valid) {
        let model = {
          // id: sessionStorage.getItem('id'),
          name: this.form.controls.name.value,
          // lastname: this.form.controls.lastname.value,
          surname: this.form.controls.surname.value,
          email: this.form.controls.email.value,
          profession: this.form.controls.profession.value,
          // education: this.form.controls.education.value,
          // experience: this.form.controls.experience.value,
          specialization: this.form.controls.specialization.value,
          picture: this.picture
        };
        this.apiService.dodajSpecialiste(model).subscribe(res => {
          this.message.setAutohiddenMessage(res['Message']);
          this.Pobierz();
        },
        err => {
          this.message.setAutohiddenMessage("Nie udało się podjąć współpracy!");
        });
      }
      else {
        this.message.setAutohiddenMessage("Nie wszystkie dane zostały prawidłowo wypełnione!");
      }
    }
    czysc(){
      this.form.reset();
      // this.initializeFormGroup();
      // this.form.controls.lastname.setErrors(null);
      // this.form.controls.education.setErrors(null);
      // this.form.controls.experience.setErrors(null);
      // this.form.controls.specialization.setErrors(null);
    }

    changeListener($event): void {
      this.readThis($event.target);
    }

    readThis(inputValue: any): void {
      // debugger;
      var file: File = inputValue.files[0];
      var myReader: FileReader = new FileReader();
      if (file.size > 2097152)
      {
        this.message.setAutohiddenMessageByKey('message1', 'Zdjęcie za duże!');
      }else{

      myReader.onloadend = (e) => {
        this.wysw = myReader.result as string;
        let resultArray = (myReader.result as string).split(',');
        this.picture = resultArray[resultArray.length - 1];
      }
      this.message.setMessageByKey('message1', null);
      this.message.setAutohiddenMessageByKey('messagesucces', "Zdjęcie dodane poprawnie!");
      myReader.readAsDataURL(file);
    }
  }
}
