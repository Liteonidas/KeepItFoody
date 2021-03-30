import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Skladniki } from '../skladniki-wyswietlanie/skladniki-wyswietlanie.component';
import { BackendClientService } from '../_shared/backend-client.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-przepisy-wyswietlanie',
  templateUrl: './przepisy-wyswietlanie.component.html',
  styleUrls: ['./przepisy-wyswietlanie.component.css']
})
export class PrzepisyWyswietlanieComponent implements OnInit, OnChanges {
  /**
   * Wyświetlanie przepisów z wartościami, składnikami, opisem
   */

  defaultImg: string = 'https://meskon.pl/site_media/images/grafiki_sklepu/thumbs_no_foto.jpg';
  baseImg: string = 'https://192.168.134.62/api';

  @Input() szukajp: string = null;

  closeResult: string;

  constructor(private modalService: NgbModal,
              private sanitization: DomSanitizer,
              private apiServie: BackendClientService) { }

  przepisy: Przepis[] = null;
  przefiltrowanePrzepisy: Przepis[] = null;
  przepis:  Przepis = null;

  ngOnChanges(changes: SimpleChanges): void {
    this.pobierzPrzepisy();
  }

  ngOnInit() {
    this.pobierzPrzepisy();
  }

  backgroundImage(img) {
    let path = img == null ? this.defaultImg : (this.baseImg + img);
    return this.sanitization.bypassSecurityTrustStyle("url('" + path + "')");
  }

  pobierzPrzepisy() {
    this.apiServie.pobierzPrzepisy().subscribe(
      res => {
        if (this.szukajp != undefined) {
          this.przefiltrowanePrzepisy = res['data'].filter(x => x.recipe_name.toUpperCase().includes(this.szukajp.toUpperCase())).sort((a,b) => (a.recipe_name > b.recipe_name) ? 1 : ((b.recipe_name > a.recipe_name) ? -1 : 0));
        }
        else {
          this.przepisy = res['data'].sort((a,b) => (a.recipe_name > b.recipe_name) ? 1 : ((b.recipe_name > a.recipe_name) ? -1 : 0));
        }
      },
      error => {
      }
    );
  }

  open(content, przepis) {
    this.przepis = przepis;
    this.apiServie.pobierzPrzepis(przepis.id_recipe).subscribe(res =>  {
      this.przepis.skladniki = res['data'];
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
export class Przepis{
  id_recipe: string;
  recipe_name: string;
  prepare: string;
  recipe_photo: string;
  preparing_time: string;
  difficulty: string;
  id_user: string;
  user_photo: string;
  first_name: string;

  skladniki: Array<Skladniki>;
}
