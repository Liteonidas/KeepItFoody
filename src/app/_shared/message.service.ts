import { timer } from 'rxjs';
import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable()
export class MessageService
{
    public content: string = null;
    public contents: any = null;
    /**
     * Konstruktor klasy obsługującej wyświetlanie wiadomości z backendu
     */

    constructor(private changeDetector: ChangeDetectorRef) {}

    /**
     * Metoda ustawiająca samozamykającą się wiadomość
     */
    setAutohiddenMessageByKey(key, value, time = 5000) {
        if (this.contents == null) this.contents = {};
        this.contents[key] = value;
        timer(time).subscribe(() => { this.setMessageByKey(key, null); })
    }
    /** 
     * Metoda ustawiająca samozamykające się wiadomości
    */
    setAutohiddenMessage(value, time = 5000) {
        this.content = value;
        timer(time).subscribe(() => {
          this.setMessage(null);
        })
    }
    /** 
     * Metoda wyświetlająca wiadomość
    */
    setMessage(value) {
        this.content = value;
        this.changeDetector.detectChanges();
    }

    /** 
     * Metoda wyświetlająca wiadomość
    */
    setMessageByKey(key, value) {
        if (this.contents == null) this.contents = {};
        this.contents[key] = value;
        this.changeDetector.detectChanges();
    }
}