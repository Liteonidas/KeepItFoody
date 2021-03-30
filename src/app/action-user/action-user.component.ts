import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';
import { NgbdSortableHeader, compare, SortEvent } from '../_shared/datatable.helpers';

@Component({
  selector: 'app-action-user',
  templateUrl: './action-user.component.html',
  styleUrls: ['./action-user.component.css']
})
export class ActionUserComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
   
  orginalUsers: any = [];
  sortedUsers: any = [];
  users: any = [];
  page = 1;
  pageSize = 10;
  collectionSize = null;
  term: string = null;

/**
   * lista zarejestrowanych użytkowników wraz z danymi, możliwosc zarządzania - dezaktywacja/aktywacja
   */ 
  constructor(private apiService: BackendClientService) { }

  ngOnInit() {
    this.pobierz();
  }
/**  
 * Metoda pobierająca dane
 *  */ 
  pobierz() {
    this.apiService.pobierzUzytkownikow().subscribe(res => {
      this.orginalUsers = res['data'];
      this.collectionSize = this.orginalUsers.length;
      this.sortedUsers = this.orginalUsers;
      this.zmienStrone();
    })
  }
/** 
 * Metoda pozwalająca zmienić stronę
   */ 
  zmienStrone()  {
    this.users = this.sortedUsers.map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  } 

  /**  
   * Metoda pozwalająca filtrować według frazy
   */ 
  filtruj() {
    let niedozwoloneWartosci = [null, undefined, '']
    if (!niedozwoloneWartosci.includes(this.term)) {
      this.page = 1;
      this.sortedUsers = this.sortedUsers.filter(x => x.first_name.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) || x.email.toLocaleLowerCase().includes(this.term.toLocaleLowerCase()) )
                                 .map((country, i) => ({id: i + 1, ...country})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    else {
      this.sortedUsers = this.orginalUsers;
    }
    this.zmienStrone();
  }

  /** 
   * Metoda służaca do sortowania  */ 
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
/**   
 * Metoda aktywująca użytkownika 
 */ 
  aktywuj(user) {
    this.apiService.aktywujUzytkownika(user.id).subscribe(res => {
      this.pobierz();
    });
  }
/**  
 * Metoda dezaktywująca użytkownika
  */ 
  dezaktywuj(user) {
    this.apiService.dezyaktywujUzytkownika(user.id).subscribe(res => {
      this.pobierz();
    });
  }
}
