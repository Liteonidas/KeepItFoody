import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtendedStorageService } from '../_shared/extended-storage.service';

@Component({
  selector: 'app-zalogowany-navbar',
  templateUrl: './zalogowany-navbar.component.html',
  styleUrls: ['./zalogowany-navbar.component.css']
})
export class ZalogowanyNavbarComponent implements OnInit {

  czyAdmin: boolean = false;
  czyPokazacAlert: boolean = false;
  today: Date = null;
  username: string = null;
  photo: string = null;

/**
   * Weryfikacja użytkownika pod względem bycia administratorem, routing między podstronami, możliwość wylogowania
   */
  constructor(private router: Router) { }

  ngOnInit() {
    this.today = new Date();
    this.czyAdmin = ExtendedStorageService.czyAdmin();
    this.PokazAlert();
    this.username = ExtendedStorageService.getUsername();
    this.photo = ExtendedStorageService.getUsersPhoto();

    setInterval(() => {
      this.photo = ExtendedStorageService.getUsersPhoto();     
    }, 500);
  }
/**Metoda wylogująca */
  wyloguj(){
    ExtendedStorageService.wyczyscCache();
    this.router.navigate(['/home']);
  }
/**Metoda sprawdzjaąca czy użytkownik podał wszystkie dane */
  PokazAlert(){
    let niedzowoloneWartosci = [null, undefined, ''];
    let dane = ExtendedStorageService.pobierzDaneUzytkownika();
    this.czyPokazacAlert = niedzowoloneWartosci.includes(dane.height) ||
                           niedzowoloneWartosci.includes(dane.weight) ||
                           niedzowoloneWartosci.includes(dane.date_birth)  ||
                           niedzowoloneWartosci.includes(dane.sex);
  }

  /**Przekierowanie dziennik dzień */
  PrzekierujNaDzien() {
    this.router.navigate(['/kalendarz/' + new Date()]);
  }
}
