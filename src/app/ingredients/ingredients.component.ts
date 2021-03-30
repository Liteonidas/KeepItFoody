import { Component, OnInit } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';
import { Skladniki } from '../skladniki-wyswietlanie/skladniki-wyswietlanie.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  constructor(private apiService: BackendClientService) { }

  skladniki: Skladniki[] = null;
  oczekujaceSkladniki: [] = null;
  skladSort: Skladniki[] = null;
  skladOryg: Skladniki[] = null;
  page = 1;
  pageSize = 15;
  collectionSize = null;
  term: string = null;
  termKat: string = null;


  ngOnInit() {
    this.PobierzOczekujace();
    this.PobierzWszystkie();
  }

  FormatujWartosc(value: string): string {
    return Number.parseFloat(value).toFixed(2);
  }

  PobierzOczekujace() {
    this.apiService.pobierzSkladnikiOczekujace().subscribe(res => {
      this.oczekujaceSkladniki = res['data'].filter(x => x.name.toUpperCase()).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    })
  }

  PobierzWszystkie()  {
    this.apiService.pobierzSkladniki().subscribe(res => {
      this.skladOryg = res['data'].filter(x => x.name.toUpperCase()).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.collectionSize = this.skladOryg.length;
          this.skladSort = this.skladOryg;
          this.zmienStrone();
    })
  }


  Usun(skladnik : Skladniki) {
    this.apiService.usunSkladnik(skladnik.ID).subscribe(res => {
      this.PobierzOczekujace();
      this.PobierzWszystkie();
    })
  }

  Aktywuj(skladnik: Skladniki)  {
   this.apiService.aktywujSkladnik(skladnik.ID).subscribe(res => {
     this.PobierzOczekujace();
     this.PobierzWszystkie();
   })
  }
  zmienStrone()  {
    this.skladniki = this.skladSort.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  filtruj() {
    let niedozwoloneWartosci = [null, undefined, '']
    if (!niedozwoloneWartosci.includes(this.term)) {
      this.page = 1;
      this.skladSort = this.skladSort.filter(x =>
         x.name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.category.toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.energy.toString().toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.protein.toString().toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.carbohydrates.toString().toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.fats.toString().toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.fibre.toString().toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
      || x.salt.toString().toLocaleLowerCase().includes(this.term.toLocaleLowerCase())
           );
           this.collectionSize = this.skladSort.length;
    }
    else {
      this.filtrujKat();
    }
    this.zmienStrone();
  }
  filtrujKat() {
    this.skladSort = this.skladOryg;
    this.collectionSize = this.skladOryg.length;
    let niedozwoloneWartosci = [null, undefined, '', 'Wszystkie']
    if (!niedozwoloneWartosci.includes(this.termKat)) {
      this.skladSort = this.skladSort.filter(x =>
        x.category.toLocaleLowerCase().includes(this.termKat.toLocaleLowerCase()));
        this.collectionSize = this.skladSort.length
    }
    this.zmienStrone();
  }

  // onSort({column, direction}: SortEvent) {

  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });

  //   if (direction === '') {
  //     this.pobierzSkladniki();
  //   }
  //   else {
  //     this.skladSort = this.skladOryg.sort((a, b) => {
  //       const res = compare(a[column], b[column]);
  //       return direction === 'asc' ? res : -res;
  //     });
  //     // this.skladniki = this.skladSort.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  //     this.zmienStrone();
  //   }
  // }
}

export interface Skladniki {
  ID?: number;
  name?: string;
  category?: string;
  energy?: number;
  protein?: number;
  carbohydrates?: number;
  fats?: number;
  fibre?: number;
  salt?: number;
  description?: string;
  gluten?: number;
  lactose?: number;
}
