
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ExtendedStorageService } from './extended-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
/**
 * Konstruktor Klasy sprawująca rolę strażnika do zasobu dla użytkownika
 * @param router służy do przekierowania
 */
    constructor(public router: Router) {}
     
    canActivate(): boolean {
        /**
         * zawiera główną logikę klasy
         */
        if(ExtendedStorageService.zalogowany()){
            return true;
        }
        this.router.navigate(['/logowanie']);
        return false;
    }
}

@Injectable()
export class AnonymousGurdService implements CanActivate {
/**
 * Klasa sprawująca rolę strażnika do zasobu dla niezalogowanego użytkownika
 */
    constructor(public router: Router) {}
    canActivate(): boolean {
        /**
         * zawiera główną logikę klasy
         */
        if(!ExtendedStorageService.zalogowany()){
            return true;
        }
        this.router.navigate(['/zalogowany']);
        return false;
    }
}

@Injectable() 
export class AdminGuardService implements CanActivate {
/**
 * Klasa sprawująca rolę strażnika do zasobu dla administratora
 */
    constructor(public router: Router) {}

    canActivate(): boolean {
        /** 
         * zawiera główną logikę klasy
        */
        if(ExtendedStorageService.czyAdmin()){
            return true;
        }
        this.router.navigate(['/logowanie']);
        return false;
    }
}