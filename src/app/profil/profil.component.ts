import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendClientService } from '../_shared/backend-client.service';
import { ExtendedStorageService } from '../_shared/extended-storage.service';
import { MessageService } from '../_shared/message.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  providers: [
    MessageService
  ]
})
export class ProfilComponent implements OnInit {
/**
   * Do widoku profilu, odnośniki do profil dane podstawowe, profil dane szczegółowe,
   * możliwosć zmiany zdjęcia, odnośnik do zmiany hasła
   */

  constructor(private apiService: BackendClientService, private router: Router, private message: MessageService) { }
  // message:string = null;
  sciezkaZdjecia:string;
  model: any;
  przeliczycBMR: boolean = false;


  ngOnInit() {
    this.model = ExtendedStorageService.pobierzDaneUzytkownika();
    this.sciezkaZdjecia = this.model.picture == "null" ? 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png' : 'https://192.168.134.62/api' + this.model.picture;
  }

  WyslijZdjecieNaSerwer(base64String) {
    let model = {
      picture: base64String,
      id: sessionStorage.getItem('id')
    };
    this.apiService.wyslijZdjecieNaServer(model).subscribe(
      result=>{
        this.message.setAutohiddenMessage(result['message']);
        this.sciezkaZdjecia = 'https://192.168.134.62/api/' + result['path'];
        sessionStorage.setItem('picture', result['path']);
      },
      error => {
        this.message.setAutohiddenMessage(error.error);
      }
    )
  }

  ZdjecieZostaloZmienione($event) : void {
    this.PobierzZdjecie($event.target);
  }

  PobierzZdjecie(inputValue: any): void {
    var file:File = inputValue.files[0];
    if (file.size > 2097152)
    {
      this.message.setAutohiddenMessage("Zdjęcie za duże!");
    }
    else {

      var myReader:FileReader = new FileReader();

      myReader.onloadend = (e) => {
        let resultArray = (myReader.result as string).split(',');
        this.WyslijZdjecieNaSerwer(resultArray[resultArray.length - 1]);
      }
      myReader.readAsDataURL(file);
    }
  }

  PrzekierujDoZmianaHasla(){
      this.router.navigate(['\zmiana-hasla']);

  }

  PrzeliczBMR(event) {
    this.przeliczycBMR = event;
  }
}
