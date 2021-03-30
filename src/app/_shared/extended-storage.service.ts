import { Injectable } from '@angular/core';

@Injectable()
export class ExtendedStorageService {
  
  /**
   * Metoda sprawdzająca czy użytkownik jest zalogowany
   */
  static zalogowany(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  /** 
   * Metoda sprawdzająca czy jest zalogoany i czy  jest administratorem
  */
  static czyAdmin(): boolean {
    return sessionStorage.getItem('token') != null && sessionStorage.getItem('isadmin') == "1";
  }
/** 
 * Metoda zapisująca dane w sessionStorage
*/
  static przekazDaneLogowanaDoCache(result) {
    sessionStorage.setItem('token', result['token']);
    sessionStorage.setItem('id', result['id']);
    sessionStorage.setItem('name', result['name']);
    sessionStorage.setItem('email', result['email']);
    sessionStorage.setItem('phone', result['phone']);
    sessionStorage.setItem('date_birth', result['date_birth']);
    sessionStorage.setItem('height', result['height']);
    sessionStorage.setItem('weight', result['weight']);
    sessionStorage.setItem('lifestyle', result['lifestyle']);
    sessionStorage.setItem('allergens', result['allergens']);
    sessionStorage.setItem('sex', result['sex']);
    sessionStorage.setItem('picture', result['picture']);
    sessionStorage.setItem('isadmin', result['isadmin']);
  }
/**
 * Metoda zapisująca dane w sessionStorage
 */
  static przekazDaneLogowaniaPrzezFacebook(result) {
    sessionStorage.setItem('token', result['token']);
    sessionStorage.setItem('id', result['id']);
    sessionStorage.setItem('name', result['name']);
    sessionStorage.setItem('email', result['email']);
    sessionStorage.setItem('date_birth', result['date_birth']);
    sessionStorage.setItem('picture', result['picture']);
  }
/** 
 * Metoda pobierająca dane użytkownika
*/
  static pobierzDaneUzytkownika() {
    return {
      id: sessionStorage.getItem('id'),
      name: sessionStorage.getItem('name'),
      email: sessionStorage.getItem('email'),
      phone: sessionStorage.getItem('phone'),
      date_birth: sessionStorage.getItem('date_birth'),
      height: sessionStorage.getItem('height'),
      weight: sessionStorage.getItem('weight'),
      lifestyle: sessionStorage.getItem('lifestyle'),
      allergens: sessionStorage.getItem('allergens'),
      sex: sessionStorage.getItem('sex'),
      picture: sessionStorage.getItem('picture')
    };
  }
/** 
 * Metoda aktualizująca dane użytkownika 
*/
  static aktualizujDanePodstawowe(model) {
    sessionStorage.setItem('name', model.new_name);
    sessionStorage.setItem('email', model.email);
    sessionStorage.setItem('date_birth', model.new_date_birth);
  }
/** 
 * Metoda aktualizująca dane szczegółowe użytkownika
*/
  static aktualizujDaneSzczegolowe(model) {
    sessionStorage.setItem('height', model.new_height.toString());
    sessionStorage.setItem('weight', model.new_weight.toString());
    sessionStorage.setItem('sex', model.sex);
    sessionStorage.setItem('lifestyle', model.lifestyle);
  }

  /** 
   * Metoda pobierająca płeć
  */
  static getSex() {
    let value = sessionStorage.getItem('sex');
    return value == undefined || value == null ? 'N' : value;
  }

  /** 
   * Metoda czyszcząca pamięć cache po wylogowaniu
  */
  static wyczyscCache() {
    sessionStorage.clear();
  }

/** 
 * Metoda pobierająca imię
*/
  static getUsername() {
    return sessionStorage.getItem('name');
  }
/** 
 * Metoda pobierająca zdjęcie użytkownika
*/
  static getUsersPhoto() {
    return sessionStorage.getItem('picture');
  }
}
