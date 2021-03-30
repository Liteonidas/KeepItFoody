import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dziennik-tydzien',
  templateUrl: './dziennik-tydzien.component.html',
  styleUrls: ['./dziennik-tydzien.component.css']
})
export class DziennikTydzienComponent implements OnInit {
/**
   * Przestarzały komponent, nie użyty w końcowej wersji strony
   */
  @Output() obecnaData: EventEmitter<any> = new EventEmitter<any>();
  @Output() zmienWidok: EventEmitter<any> = new EventEmitter<any>();

  dniTygodnia: any = null;
  currentDay: string = null;
  currentMonth: string = null;
  date: Date = null;

  constructor() { }

  ngOnInit() {
    this.date = new Date();
    this.currentDay = ("0" + this.date.getDate()).slice(-2);
    this.currentMonth = ("0" + (this.date.getMonth()+1)).slice(-2);
    this.UstawTydzien();
  }

  NastepnyTydzien() {
    this.date.setDate(this.date.getDate() + 7);
    this.UstawTydzien();
  }

  PoprzedniTydzien() {
    this.date.setDate(this.date.getDate() - 7);
    this.UstawTydzien();
  }

  private UstawTydzien() {
    let tmpData = new Date(this.date);
    this.dniTygodnia = this.DniTygodnia(tmpData).map(x => ({ 
      DzienTygodnia: this.DzienTygodnia(x.getDay()),
      DzienMiesiaca: ("0" + x.getDate()).slice(-2),
      Miesiac: ("0" + (x.getMonth() + 1)).slice(-2)
    }));
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
