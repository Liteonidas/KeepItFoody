import { Component, OnInit, QueryList, ViewChildren, ViewEncapsulation, OnChanges } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';
import { NgbdSortableHeader, compare, SortEvent } from '../_shared/datatable.helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-skladniki',
  templateUrl: './skladniki.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./skladniki.component.css']
})
export class SkladnikiComponent implements OnInit{
  

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  // public formw: FormGroup;
  // public szukaj: string;
  // public kategoria: string;

  skladOryg: Skladniki[] = null;
  skladniki: Skladniki[] = null;
  skladSort: Skladniki[] = null;
  page = 1;
  pageSize = 15;
  collectionSize = null;
  term: string = null;
  termKat: string = null;

  /**
   * Pobranie składników ze wszystkimi szczegółami, 
   * możliwość sortowania i wyszukiwania składników
   */
  constructor(private apiService: BackendClientService, private modalService: NgbModal) { }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  // wyszukaj(){
  //   this.szukaj = this.formw.controls.szukaj.value;
  // }
  // KategoriaChanged(kategoria){
  //   this.kategoria = kategoria === '' ? null : kategoria;
  // }

  ngOnInit() {
    this.pobierzSkladniki();
    // this.formw = new FormGroup({
    //   szukaj: new FormControl()
    // });
    this.termKat = "Wszystkie";
  }

  /** Metoda pobierająca składniki */
  pobierzSkladniki() {
    this.apiService.pobierzSkladniki().subscribe(
      res => {
          this.skladOryg = res['data'].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.collectionSize = this.skladOryg.length;
          this.skladSort = this.skladOryg;
          this.zmienStrone();
      },
      error => {
      }
    );
  }

  /** Metoda zmieniająca stronę */
  zmienStrone()  {
    this.skladniki = this.skladSort.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /** Metoda filtrująca na podstawie frazy */
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
  /** Filtrowanie względem kategorii */
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

  onSort({column, direction}: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this.pobierzSkladniki();
    }
    else {
      this.skladSort = this.skladOryg.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      // this.skladniki = this.skladSort.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      this.zmienStrone();
    }
  }

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
