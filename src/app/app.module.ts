import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { HomeComponent } from './home/home.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { ZalogowanyComponent } from './zalogowany/zalogowany.component';
import { ProfilComponent } from './profil/profil.component';
import { ZalogowanyNavbarComponent } from './zalogowany-navbar/zalogowany-navbar.component';
import { ProfilDanePodstawoweComponent } from './profil-dane-podstawowe/profil-dane-podstawowe.component';
import { ProfilDaneSzczegoloweComponent } from './profil-dane-szczegolowe/profil-dane-szczegolowe.component';
import { ProfilPlatnosciComponent } from './profil-platnosci/profil-platnosci.component';
import { SocialLoginModule, AuthServiceConfig } from 'angular5-social-login';
import { FacebookLoginProvider } from 'angular5-social-login';
import { getAuthServiceConfigs } from './_shared/socialloginConfig';
import { AuthGuardService, AnonymousGurdService, AdminGuardService } from './_shared/Auth-Guard-Service';
import { PrzepisyComponent } from './przepisy/przepisy.component';
import { SkladnikiComponent } from './skladniki/skladniki.component';
import { DziennikComponent } from './dziennik/dziennik.component';
import { DziennikDzienComponent } from './dziennik-dzien/dziennik-dzien.component';
import { DziennikTydzienComponent } from './dziennik-tydzien/dziennik-tydzien.component';
import { DziennikMiesiacComponent } from './dziennik-miesiac/dziennik-miesiac.component';
import { PrzypomnijHasloComponent } from './przypomnij-haslo/przypomnij-haslo.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { SkladnikiWyswietlanieComponent } from './skladniki-wyswietlanie/skladniki-wyswietlanie.component';
import { PrzepisyWyswietlanieComponent } from './przepisy-wyswietlanie/przepisy-wyswietlanie.component';
import { DodajSkladnikComponent } from './dodaj-skladnik/dodaj-skladnik.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ZmianaHaslaComponent } from './zmiana-hasla/zmiana-hasla.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DodajPrzepisComponent } from './dodaj-przepis/dodaj-przepis.component';
import { WiadomosciComponent } from './wiadomosci/wiadomosci.component';
import { DietyComponent } from './diety/diety.component';
import { DodajPosilekComponent } from './dodaj-posilek/dodaj-posilek.component';
import { KalendarzComponent, CalendarTitlePipe } from './kalendarz/kalendarz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { SpecjalisciComponent } from './specjalisci/specjalisci.component';
import { DietaPremiumComponent } from './dieta-premium/dieta-premium.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { ActionUserComponent } from './action-user/action-user.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ShowIngredientsComponent } from './show-ingredients/show-ingredients.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { StatisticComponent } from './statistic/statistic.component';
import { BackendClientService } from './_shared/backend-client.service';
import { DietaWyswietlanieComponent } from './dieta-wyswietlanie/dieta-wyswietlanie.component';
import { NgbdSortableHeader } from './_shared/datatable.helpers';
import { Pusta1Component } from './pusta1/pusta1.component';
import { Pusta2Component } from './pusta2/pusta2.component';
import { StickyfooterComponent } from './stickyfooter/stickyfooter.component';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DietaDodajComponent } from './dieta-dodaj/dieta-dodaj.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MessageService } from './_shared/message.service';
import {MatStepperModule, MatStepperIntl} from '@angular/material/stepper';
import { WspolpracaComponent } from './wspolpraca/wspolpraca.component';
import { AdminSpecialistComponent } from './admin-specialist/admin-specialist.component';
// import { WspolpracaComponent } from './wspolpraca/wspolpraca.component';
registerLocaleData(localePl);

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SliderComponent,
    HomeComponent,
    LogowanieComponent,
    RejestracjaComponent,
    ZalogowanyComponent,
    ProfilComponent,
    ZalogowanyNavbarComponent,
    ProfilDanePodstawoweComponent,
    ProfilDaneSzczegoloweComponent,
    ProfilPlatnosciComponent,
    SkladnikiComponent,
    PrzepisyComponent,
    DziennikComponent,
    DziennikDzienComponent,
    DziennikTydzienComponent,
    DziennikMiesiacComponent,
    PrzypomnijHasloComponent,
    SkladnikiWyswietlanieComponent,
    PrzepisyWyswietlanieComponent,
    DodajSkladnikComponent,
    ZmianaHaslaComponent,
    DodajPrzepisComponent,
    WiadomosciComponent,
    DietyComponent,
    DodajPosilekComponent,
    KalendarzComponent,
    SpecjalisciComponent,
    DietaPremiumComponent,
    AppComponent,
    AdminMainComponent,
    AdminNavbarComponent,
    ActionUserComponent,
    IngredientsComponent,
    ShowIngredientsComponent,
    ShowUsersComponent,
    StatisticComponent,
    DietaWyswietlanieComponent,
    NgbdSortableHeader,
    Pusta1Component,
    Pusta2Component,
    StickyfooterComponent,
    DietaDodajComponent,
    CalendarTitlePipe,
    WspolpracaComponent,
    AdminSpecialistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgbModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgCircleProgressModule.forRoot({
      maxPercent: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
    }),
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule
  ],
  providers: [
    {
      provide: AuthServiceConfig, useFactory: getAuthServiceConfigs
    },
    AuthGuardService,
    AnonymousGurdService,
    AdminGuardService,
    BackendClientService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
