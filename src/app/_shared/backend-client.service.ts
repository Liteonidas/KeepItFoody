import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogowanieModel } from '../logowanie/logowanie.component';
import { Uzytkownik as UzytkownikModel } from '../rejestracja/rejestracja.component';
import { DodajSKladnikModel } from '../dodaj-skladnik/dodaj-skladnik.component';

@Injectable()
export class BackendClientService {


  private baseURL = 'https://192.168.134.62/';

  /**
   * Klasa zapewniająca połączenie z backendem 
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Metoda pobierająca dane jeśli użytkownik jest zalogowany
   */
  zalogujIPobierzDaneUzytkownika(model: LogowanieModel) {
    return this.httpClient.post(this.baseURL + 'api/user/login.php', model, { headers: new HttpHeaders({  'Content-Type': 'application/hal+json'  })});
  }

  /** 
   * Metoda pozwalająca na logowanie przez Social Media
  */
  zalogujPrzezSocialMedia(model: { email: string, first_name: string}) {
    return this.httpClient.post(this.baseURL + 'api/user/fbgmail.php', model);
  }

  /** 
   * Metoda pozwalająca na rejestrację nowego użytkownika
  */
  zarejestrujUzytkownika(model: UzytkownikModel) {
    return this.httpClient.post(this.baseURL + 'api/user/register.php', model, { headers: new HttpHeaders({ 'Content-Type': 'application/hal+json' }) });
  }

  /**
   * Metoda pobierająca składniki
   */
  pobierzSkladniki() {
    return this.httpClient.get(this.baseURL + 'api/ingredient/read.php');
  }

  /** 
   * Metoda pozwalająca dodać składnik
  */
  dodajSkladnik(skl: DodajSKladnikModel) {
    return this.httpClient.post(this.baseURL + 'api/ingredient/add.php', skl, { headers: new HttpHeaders({ 'Content-Type': 'application/hal+json' }) });
  }

  /** 
   * Metoda pobierająca przepisy
  */
  pobierzPrzepisy() {
    return this.httpClient.get(this.baseURL + 'api/recipe/read.php');
  }

  /** 
   * Metoda pobierająca przepisy ze składnikami
  */
  pobierzPrzepis(id) {
    return this.httpClient.get(this.baseURL + 'api/recipe/read.php?id_recipe=' + Number.parseInt(id));
  }

  /** 
   * Metoda pobierjąca składniki posiłku użytkownika
  */
  pobierzSkladnikiDoPosilku(idUser, idPosilku) {
    return this.httpClient.get(this.baseURL + 'api/user/read-meals.php?who=' + idUser + '&fk_ing=' + idPosilku);
  }

  /** 
   * Metoda pozwalająca dodać przepis
  */
  dodajPrzepis(przep) {
    return this.httpClient.post(this.baseURL + 'api/recipe/add.php', przep);
  }

  /** 
   * Metoda pobierająca posiłki
  */
  pobierzPosilki(id) {
    return this.httpClient.get(this.baseURL + 'api/user/read-meals.php?who=' + id);
  }

  /** 
   * Metoda dodająca posiłek
  */
  dodajPosilek(model) {
    return this.httpClient.post(this.baseURL + 'api/user/add-meal.php', model);
  }

  /** 
   * Metoda aktualizująca dane użytkownika
  */
  aktualizujDaneUzytkownika(model) {
    return this.httpClient.put(this.baseURL + 'api/user/update.php', model, { headers: new HttpHeaders({  'Content-Type': 'application/hal+json'  })})
  }

  /**
   * Metoda aktualizacji zdjęcia profilowego
   */
  wyslijZdjecieNaServer(model) {
    return this.httpClient.put(this.baseURL + 'api/user/photo.php', model);
  }

  /** 
   * Metoda zmiany hasła
  */
  zmienHaslo(model) {
    return this.httpClient.put(this.baseURL + 'api/user/change-pass.php', model);
  }

  /**
   * Metoda pobierająca statystyki
   */
  pobierzStatystyke(value: string) {
    return this.httpClient.get(this.baseURL + 'api/admin/select.php?' + value);
  }

  /** 
   * Metoda pobierająca użytkowników
  */
  pobierzUzytkownikow() {
    return this.httpClient.get(this.baseURL + 'api/admin/all-users.php');
  }

/**
 * Metoda aktywująca użytkownika
 */
  aktywujUzytkownika(id_user)  {
    let model = {
      id_user: id_user
    };
    return this.httpClient.put(this.baseURL + 'api/admin/undelete-user.php', model);
  }

  /** 
   * Metoda dezaktywujaca użytkownika
  */
  dezyaktywujUzytkownika(id_user)  {
    let model = {
      id_user: id_user
    };
    return this.httpClient.put(this.baseURL + 'api/admin/delete-user.php', model);
  }

  /** 
   * Metoda pobierająca składniki do akceptacji
  */
  pobierzSkladnikiOczekujace()  {
    return this.httpClient.get(this.baseURL + 'api/admin/ing-to-accept.php');
  }

  /** 
   * Metoda do aktywacji składnikow przez administratora 
  */
  aktywujSkladnik(id_ingredient) {
    let model =  {
      id_ingredient : id_ingredient
    };
    return this.httpClient.put(this.baseURL + 'api/admin/accept-ingredient.php', model);
  }

  /**
   * Metoda do usuniecia składnika przez administratora
   */
  usunSkladnik(id_ingredient) {
    let model =  {
      id_ingredient : id_ingredient
    };
    return this.httpClient.post(this.baseURL + 'api/admin/delete-ingredient.php', model);
  }

  /** 
   * Metoda do usunięcia posiłku przez użytkownika
  */
  usunPosilek(who, id_meal)  {
    let model = {
      who: who,
      id_meal: id_meal
    };
    return this.httpClient.post(this.baseURL + 'api/user/delete-meal.php', model);
  }
/**
 * Metoda przestarzala
 */
  dodajDiete(model) {
    return this.httpClient.post(this.baseURL + 'api/diet/add.php', model);
  }

  /** 
   * Metoda przestarzała
  */
  pobierzDiete() {
    return this.httpClient.get(this.baseURL + '/api/diet/read.php');
  }

  /** 
   * Metoda przestarzała
  */
  usunDiete() {

  }

  /** 
   * Metoda pobierająca specjalistów
  */
  pobierzSpecialistow()  {
    return this.httpClient.get(this.baseURL + 'api/specialist/read.php');
  }

  /** 
   * Metoda dodająca specjalistów
  */

  dodajSpecialiste(model) {
    return this.httpClient.post(this.baseURL + 'api/specialist/register.php', model);
  }

  /**
   * Metoda pozwalająca na wysłanie maila do specjalisty
   */
  wyslijMailaDoSpecialisty(model: {specialist_email: string, first_name: string, user_email: string}) {
    return this.httpClient.post(this.baseURL + 'api/specialist/email-to-specialist.php', model);
  }

  /** 
   * Metoda pobierająca wodę na podstawie BMR
  */
  pobierzWodeIBMR(who: string) {
    return this.httpClient.get(this.baseURL + 'api/user/bmr.php?who=' + who);
  }
/** 
 * Metoda pobierająca nieaktywnych specjalistow
*/
  pobierzNieaktywnychSpecialistow() {
    return this.httpClient.get(this.baseURL + 'api/admin/inactive.php');
  }

  /** 
   * Metoda pozwalająca na aktywację specjalisty przez administratora
  */
  aktwyujSpecialiste(id: string) {
    let obj = { id: id };
    return this.httpClient.post(this.baseURL + 'api/admin/activate.php', obj);
  }
}
