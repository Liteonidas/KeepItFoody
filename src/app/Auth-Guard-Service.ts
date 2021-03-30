
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public router: Router) {}

    canActivate(): boolean {
        if(sessionStorage.getItem('token')!=null){
            return true;
        }
        this.router.navigate(['/logowanie']);
        return false;
    }
}

@Injectable()
export class AnonymousGurdService implements CanActivate {
    constructor(public router: Router) {}

    canActivate(): boolean {
        if(sessionStorage.getItem('token') == null){
            return true;
        }
        this.router.navigate(['/zalogowany']);
        return false;
    }
}

@Injectable() 
export class AdminGuardService implements CanActivate {
    constructor(public router: Router) {}

    canActivate(): boolean {
        if(sessionStorage.getItem('token') != null && sessionStorage.getItem('isadmin') != "1"){
            return true;
        }
        this.router.navigate(['/admin']);
        return false;
    }
}