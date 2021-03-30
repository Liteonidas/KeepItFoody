import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { ZalogowanyComponent } from './zalogowany/zalogowany.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuardService, AnonymousGurdService, AdminGuardService } from './_shared/Auth-Guard-Service';
import { PrzepisyComponent } from './przepisy/przepisy.component';
import { DziennikComponent } from './dziennik/dziennik.component';
import { SkladnikiComponent } from './skladniki/skladniki.component';
import { PrzypomnijHasloComponent } from './przypomnij-haslo/przypomnij-haslo.component';
import { DziennikDzienComponent } from './dziennik-dzien/dziennik-dzien.component';
import { SkladnikiWyswietlanieComponent } from './skladniki-wyswietlanie/skladniki-wyswietlanie.component';
import { PrzepisyWyswietlanieComponent } from './przepisy-wyswietlanie/przepisy-wyswietlanie.component';
import { DodajSkladnikComponent } from './dodaj-skladnik/dodaj-skladnik.component';
import { ZmianaHaslaComponent } from './zmiana-hasla/zmiana-hasla.component';
import { DodajPrzepisComponent } from './dodaj-przepis/dodaj-przepis.component';
import { WiadomosciComponent } from './wiadomosci/wiadomosci.component';
import { DietyComponent } from './diety/diety.component';
import { DodajPosilekComponent } from './dodaj-posilek/dodaj-posilek.component';
import { KalendarzComponent } from './kalendarz/kalendarz.component';
import { SpecjalisciComponent } from './specjalisci/specjalisci.component';
import { DietaPremiumComponent } from './dieta-premium/dieta-premium.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { StatisticComponent } from './statistic/statistic.component';
import { ActionUserComponent } from './action-user/action-user.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { DietaWyswietlanieComponent } from './dieta-wyswietlanie/dieta-wyswietlanie.component';
import { DziennikTydzienComponent } from './dziennik-tydzien/dziennik-tydzien.component';
import { Pusta1Component } from './pusta1/pusta1.component';
import { Pusta2Component } from './pusta2/pusta2.component';
import { DietaDodajComponent } from './dieta-dodaj/dieta-dodaj.component';
import { WspolpracaComponent } from './wspolpraca/wspolpraca.component';
import { AdminSpecialistComponent } from './admin-specialist/admin-specialist.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [AnonymousGurdService]
  },
  {
    path: 'logowanie', component: LogowanieComponent,  canActivate: [AnonymousGurdService]
  },
  {
    path: 'rejestracja', component: RejestracjaComponent, canActivate: [AnonymousGurdService]
  },
  {
    path: 'zalogowany', component: ZalogowanyComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'przepisy', component: PrzepisyComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dziennik', component: DziennikComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dziennik-tydzien', component: DziennikTydzienComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'Skladniki', component: SkladnikiComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'przypomnijHaslo', component: PrzypomnijHasloComponent,  canActivate: [AnonymousGurdService]
  },
  {
    path: 'pusta1', component: Pusta1Component,  canActivate: [AnonymousGurdService]
  },
  {
    path: 'pusta2', component: Pusta2Component, canActivate: [AuthGuardService]
  },
  {
    path: 'admin-specjalist', component: AdminSpecialistComponent, canActivate: [AdminGuardService]
  },
  // {
  //   path: 'dziennikDzien/:poZalogowaniu', component: DziennikDzienComponent, canActivate: [AuthGuardService]
  // },
  {
    path: 'zmiana-hasla', component: ZmianaHaslaComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'skladniki-wyswietlanie', component: SkladnikiWyswietlanieComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'przepisy-wyswietlanie', component: PrzepisyWyswietlanieComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dodaj-przepis', component: DodajPrzepisComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dodaj-skladnik', component: DodajSkladnikComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'wiadomosci', component: WiadomosciComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dodaj-posilek', component: DodajPosilekComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'kalendarz/:date', component: KalendarzComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'kalendarz', component: KalendarzComponent, canActivate: [AuthGuardService]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'diety', component: DietyComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'specjalisci', component: SpecjalisciComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dieta-premium', component: DietaPremiumComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dieta-wyswietlanie', component: DietaWyswietlanieComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'dieta-dodaj', component: DietaDodajComponent, canActivate: [AuthGuardService]
  },
   {
     path: 'wspolpraca', component: WspolpracaComponent, canActivate: [AuthGuardService]
   },
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'admin-statystyki',
    component: StatisticComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'admin-uzytkownicy',
    component: ActionUserComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'admin-skladniki',
    component: IngredientsComponent,
    canActivate: [AdminGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
