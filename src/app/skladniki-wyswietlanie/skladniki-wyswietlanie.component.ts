import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { BackendClientService } from '../_shared/backend-client.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-skladniki-wyswietlanie',
  templateUrl: './skladniki-wyswietlanie.component.html',
  styleUrls: ['./skladniki-wyswietlanie.component.css']
})
export class SkladnikiWyswietlanieComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'name', 'energy', 'protein', 'carbohydrates', 'fats', 'fibre', 'salt', 'gluten'];
  skladniki: MatTableDataSource<Skladniki>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   *Pobranie i wyświetlenie składników wraz ze szczegółami
   */
  constructor(private apiService: BackendClientService) { }

  ngOnInit() {
    this.pobierzSkladniki();
  }
/**  Metoda pobierająca składniki*/
  pobierzSkladniki() {
    this.apiService.pobierzSkladniki().subscribe(
      res => {
          this.skladniki = new MatTableDataSource(res['data']);
          this.skladniki.paginator = this.paginator;
          this.skladniki.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.skladniki.filter = filterValue.trim().toLowerCase();

    if (this.skladniki.paginator) {
      this.skladniki.paginator.firstPage();
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