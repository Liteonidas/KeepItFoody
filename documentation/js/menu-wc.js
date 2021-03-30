'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">keep-it-foody documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' : 'data-target="#xs-components-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' :
                                            'id="xs-components-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                            <li class="link">
                                                <a href="components/ActionUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminNavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminNavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminSpecialistComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminSpecialistComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DietaDodajComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietaDodajComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DietaPremiumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietaPremiumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DietaWyswietlanieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietaWyswietlanieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DietyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DietyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DodajPosilekComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DodajPosilekComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DodajPrzepisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DodajPrzepisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DodajSkladnikComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DodajSkladnikComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DziennikComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DziennikComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DziennikDzienComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DziennikDzienComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DziennikMiesiacComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DziennikMiesiacComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DziennikTydzienComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DziennikTydzienComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IngredientsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IngredientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KalendarzComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">KalendarzComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogowanieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogowanieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilDanePodstawoweComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilDanePodstawoweComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilDaneSzczegoloweComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilDaneSzczegoloweComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilPlatnosciComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilPlatnosciComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrzepisyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrzepisyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrzepisyWyswietlanieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrzepisyWyswietlanieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrzypomnijHasloComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrzypomnijHasloComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Pusta1Component.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Pusta1Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Pusta2Component.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Pusta2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RejestracjaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RejestracjaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowIngredientsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowIngredientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowUsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SkladnikiComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SkladnikiComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SkladnikiWyswietlanieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SkladnikiWyswietlanieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SliderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpecjalisciComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpecjalisciComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatisticComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatisticComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StickyfooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StickyfooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WiadomosciComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WiadomosciComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WspolpracaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WspolpracaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ZalogowanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ZalogowanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ZalogowanyNavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ZalogowanyNavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ZmianaHaslaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ZmianaHaslaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' : 'data-target="#xs-directives-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' :
                                        'id="xs-directives-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                        <li class="link">
                                            <a href="directives/NgbdSortableHeader.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NgbdSortableHeader</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' : 'data-target="#xs-injectables-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' :
                                        'id="xs-injectables-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                        <li class="link">
                                            <a href="injectables/BackendClientService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BackendClientService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessageService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MessageService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' : 'data-target="#xs-pipes-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' :
                                            'id="xs-pipes-links-module-AppModule-05665716aaca7cb55c665a62fef3b2b4"' }>
                                            <li class="link">
                                                <a href="pipes/CalendarTitlePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CalendarTitlePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ToastMessagesComponent.html" data-type="entity-link">ToastMessagesComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CustomDateFormatter.html" data-type="entity-link">CustomDateFormatter</a>
                            </li>
                            <li class="link">
                                <a href="classes/DodajSKladnikModel.html" data-type="entity-link">DodajSKladnikModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DodPrzep.html" data-type="entity-link">DodPrzep</a>
                            </li>
                            <li class="link">
                                <a href="classes/LogowanieModel.html" data-type="entity-link">LogowanieModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordValidation.html" data-type="entity-link">PasswordValidation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Przepis.html" data-type="entity-link">Przepis</a>
                            </li>
                            <li class="link">
                                <a href="classes/Uzytkownik.html" data-type="entity-link">Uzytkownik</a>
                            </li>
                            <li class="link">
                                <a href="classes/WybranySkladnik.html" data-type="entity-link">WybranySkladnik</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZapisDanychModel.html" data-type="entity-link">ZapisDanychModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZapisDanychModel-1.html" data-type="entity-link">ZapisDanychModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ZmianaHaslaModel.html" data-type="entity-link">ZmianaHaslaModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BackendClientService.html" data-type="entity-link">BackendClientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomDatepickerI18n.html" data-type="entity-link">CustomDatepickerI18n</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomDatepickerI18n-1.html" data-type="entity-link">CustomDatepickerI18n</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExtendedStorageService.html" data-type="entity-link">ExtendedStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/I18n.html" data-type="entity-link">I18n</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/I18n-1.html" data-type="entity-link">I18n</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link">MessageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuardService.html" data-type="entity-link">AdminGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AdminGuardService-1.html" data-type="entity-link">AdminGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AnonymousGurdService.html" data-type="entity-link">AnonymousGurdService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AnonymousGurdService-1.html" data-type="entity-link">AnonymousGurdService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardService-1.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Skladniki.html" data-type="entity-link">Skladniki</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Skladniki-1.html" data-type="entity-link">Skladniki</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Skladniki-2.html" data-type="entity-link">Skladniki</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortEvent.html" data-type="entity-link">SortEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Specialisci.html" data-type="entity-link">Specialisci</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});