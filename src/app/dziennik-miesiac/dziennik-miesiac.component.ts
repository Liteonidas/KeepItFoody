import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dziennik-miesiac',
  templateUrl: './dziennik-miesiac.component.html',
  styleUrls: ['./dziennik-miesiac.component.css']
})
export class DziennikMiesiacComponent implements OnInit {

  /** 
   * Klasa z widokiem miesiąca oraz informujaca o posiłkach w miesiacu 
   */
  constructor() { }

  date: Date;
  dateFormat: string;
  pierwszyTydzien: any;
  drugiTydzien: any;
  trzeciTydzien: any;
  czwartyTydzien: any;
  piatyTydzien: any;
  selectedDate: Date;
  
  @Output() obecnaData: EventEmitter<any> = new EventEmitter<any>();
  @Output() zmienWidok: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.date = new Date();
    this.dateFormat = ("0" + this.date.getDate()).slice(-2);
    this.date.setDate(1);
    this.UstawMiesiac();
  }

  NastepnyMiesiac() {
    this.date.setMonth(this.date.getMonth()+1);
    this.UstawMiesiac();
    this.obecnaData.emit({ date: this.date, czyPokazacDzien: false }); 
  }

  PoprzedniMiesiac() {
    this.date.setMonth(this.date.getMonth()-1);
    this.UstawMiesiac();
    this.obecnaData.emit({ date: this.date, czyPokazacDzien: false }); 
  }

  private UstawTydzien(date) {
    let tmpData = new Date(date);
    let dniTygodnia = this.DniTygodnia(tmpData).map(x => ({ 
      DzienTygodnia: this.DzienTygodnia(x.getDay()),
      DzienMiesiaca: ("0" + x.getDate()).slice(-2),
      Miesiac: ("0" + (x.getMonth() + 1)).slice(-2),
    }));
    return dniTygodnia;
  }
  private UstawMiesiac(){
    let tmpDate = new Date(this.date);
    this.pierwszyTydzien = this.UstawTydzien(tmpDate);
    tmpDate.setDate(tmpDate.getDate()+7);
    this.drugiTydzien = this.UstawTydzien(tmpDate);
    tmpDate.setDate(tmpDate.getDate()+7);
    this.trzeciTydzien = this.UstawTydzien(tmpDate);
    tmpDate.setDate(tmpDate.getDate()+7);
    this.czwartyTydzien = this.UstawTydzien(tmpDate);
    tmpDate.setDate(tmpDate.getDate()+7);
    this.piatyTydzien = this.UstawTydzien(tmpDate);
    this.obecnaData.emit({ date: this.date, czyPokazacDzien: false }); 

  }

  private DniTygodnia(current) {
    var week = [];
    current.setDate(this.PobierzPoczatekTygodnia(current).getDate());
    for (var i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate()+1);
    }
    return week;
  }

  private PobierzPoczatekTygodnia(d) {
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  private DzienTygodnia(value: number) {
    switch(value) {
      case 1:
        return "Poniedziałek";
      case 2:
        return "Wtorek";
      case 3:
        return "Środa";
      case 4: 
        return "Czwartek";
      case 5: 
        return "Piątek";
      case 6:
        return "Sobota";
      case 0:
        return "Niedziela";
    }
  }

  PokazDzien(dzien: string, miesiac: string) {
    let date = new Date();
    date.setMonth(parseInt(miesiac) - 1);
    date.setDate(parseInt(dzien));
    this.obecnaData.emit({date: date, czyPokazacDzien: true})
    this.zmienWidok.emit(0);
  }
}
