import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { compare, SortEvent, NgbdSortableHeader } from '../_shared/datatable.helpers';
import { BackendClientService } from '../_shared/backend-client.service';

@Component({
  selector: 'app-admin-specialist',
  templateUrl: './admin-specialist.component.html',
  styleUrls: ['./admin-specialist.component.css']
})
export class AdminSpecialistComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  orginalUsers: any = [];
  sortedUsers: any = [];
  users: any = [];
  page = 1;
  pageSize = 10;
  collectionSize = null;
  term: string = null;

/**
   * Konstruktor klasy, która jest odpowiedzialna za pobranie listy zgłoszeń specjalistów, możliwoć ich akceptacji, wyszukiwania
   */
  constructor(private apiService: BackendClientService) { }

  ngOnInit() {
    this.pobierz();
  }
/**
   * pobieranie zgłoszeń specjalistów
   */
  pobierz() {
    this.apiService.pobierzNieaktywnychSpecialistow().subscribe(res => {
      this.orginalUsers = res['data'];
      console.log(this.orginalUsers);
      this.collectionSize = this.orginalUsers.length;
      this.sortedUsers = this.orginalUsers;
      this.zmienStrone();
    })
  }
/**
   * możliwość akceptacji specjalistów
   */
  aktywuj(id : string) {
    this.apiService.aktwyujSpecialiste(id).subscribe(res => {
      console.log(res);
      this.pobierz();
    })
  }
/**
 * Metoda pozwalająca zmienic stronę
 */
  zmienStrone()  {
    this.users = this.sortedUsers.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /**
 * Metoda filtrująca specjalistów po wpisanej frazie
 */
  filtruj() {
    let niedozwoloneWartosci = [null, undefined, '']
    if (!niedozwoloneWartosci.includes(this.term)) {
      this.page = 1;
      this.sortedUsers = this.sortedUsers.filter(x => x.name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) || x.surname.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) || x.email.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) )
                                 .map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    else {
      this.sortedUsers = this.orginalUsers;
    }
    this.zmienStrone();
  }
/**
 * Metoda sortująca
 */
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      this.pobierz();
    }
    else {
      this.sortedUsers = this.orginalUsers.sort((a, b) => {
        const res = column == 'id' ? compare(parseInt(a[column]), parseInt(b[column])) : compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.users = this.sortedUsers.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }
}
