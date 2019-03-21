import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import "rxjs/add/operator/take"
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Month } from '../classes/month.class';
import { CountryPriority, CountryRegionPriority } from '../classes/priority.class';
import { SearchCriteria } from '../classes/search-criteria.class';

import { HttpOperationResult, HttpQueryResult } from '../classes/http-result.class'

import { HelperService } from '../services/helper.service';
import { HttpService } from '../services/http.service';

@Component({
    selector: 'app-search-box',
    templateUrl: '../html/search-box.component.html',
    styleUrls: ['../css/search-box.component.css']
})

export class SearchBox implements OnInit {

    private countryCriteriaSubject = new Subject<string>();
    private continentCriteriaSubject = new Subject<string>();

    countriesSource: Array<string> = [];
    countries: Array<string> = [];

    continentSource: Array<string> = [];
    continents: Array<string> = [];

    countryPrioritiesSource: Array<CountryPriority> = [];
    countryPriorities: Array<CountryPriority> = [];

    seasonsSource: Array<Month> = [];
    seasons: Array<Month> = [];
    seasonsTo: Array<Month> = [];

    selectedCountry: string;
    @ViewChild('txtCountryKendo') txtCountryKendo;

    selectedContinent: string;
    @ViewChild('txtContinentKendo') txtContinentKendo;

    selectedCountryPriority: CountryPriority;
    selectedIsVisited: boolean;
    selectedIsAll: boolean;

    selectedSeasonFrom: number;
    selectedSeasonTo: number;
    @ViewChild('txtSeasonFromKendo') txtSeasonFromKendo;
    @ViewChild('txtSeasonToKendo') txtSeasonToKendo;

    newButtonsList: Array<any> = [{
        id: 0,
        text: 'New Country'
    }, {
        id: 1,
        text: 'New Group'
    }];

    constructor(
        private httpService: HttpService,
        private helperService: HelperService,
        private router: Router,
        private route: ActivatedRoute) {

        helperService.searchCriteriaMessage.subscribe(
            searchCriteria => {
                this.selectedCountry = searchCriteria.country;
                this.selectedContinent = searchCriteria.continent;
                this.selectedCountryPriority = this.countryPrioritiesSource.find(cp => cp.sequenceNumber.toString() == searchCriteria.countryPriority);
                this.selectedIsVisited = searchCriteria.isVisited == 'yes' ? true : false;
                this.selectedIsAll = searchCriteria.isAll;
                this.selectedSeasonFrom = searchCriteria.seasonFrom;
                this.selectedSeasonTo = searchCriteria.seasonTo;
            });

        this.seasonsSource = helperService.getSeasons();
        this.seasons = this.seasonsSource;
        this.seasonsTo = this.seasonsSource;

        this.countryPrioritiesSource = helperService.getCountryPriority();
        this.countryPriorities = this.countryPrioritiesSource;
    };

    ngOnInit(): void {

        this.initRouteData();

        this.initCountries();

        this.initContinents();

        this.initCountrySubject();

        this.initContinentSubject();
    }

    initRouteData() {

    }

    initCountries(): void {

        this.httpService.getCountryNames().subscribe(
            (result: HttpQueryResult<string>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.countriesSource = result.result;

                    this.countries = this.countriesSource;
                }
                else {

                    this.countriesSource = [];
                    this.countries = this.countriesSource;

                    console.log('No Country with name' + this.selectedCountry);
                }
            },
            (error: any) => {

                this.countriesSource = [];
                this.countries = this.countriesSource;

                console.log(JSON.stringify(error));
            },
            () => {

            });
    }

    initContinents(): void {

        this.httpService.getContinentNames().subscribe(
            (result: HttpQueryResult<string>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.continentSource = result.result;

                    this.continents = this.continentSource;
                }
                else {

                    this.continentSource = [];
                    this.continents = this.continentSource;

                    console.log('No Country with name' + this.selectedCountry);
                }
            },
            (error: any) => {

                this.continentSource = [];
                this.continents = this.continentSource;

                console.log(JSON.stringify(error));
            },
            () => {

            });
    }

    ////////////Country

    private initCountrySubject(): void {

        const contains = value => s =>
            s.toLowerCase().indexOf(value.toLowerCase()) !== -1;

        this.countryCriteriaSubject
            .debounceTime(500)
            .distinctUntilChanged()
            .do((): void => {
                this.txtCountryKendo.loading = true;
            })
            .switchMap((countryFilter: string): Observable<Array<string>> => {

                if (countryFilter.length >= 1) {
                    let filteredCountries = this.countriesSource.filter(contains(countryFilter));

                    let result = new Array<string>();

                    if (filteredCountries && filteredCountries.length != 0) {

                        result = filteredCountries;
                    }

                    return Observable.of<Array<string>>(result);
                }
                else {
                    let result = new Array<string>();

                    if (countryFilter) {
                        result = this.countriesSource;
                    }
                    else {
                        result = [];
                    }

                    return Observable.of<Array<string>>(result);
                }
            })
            .subscribe(
            (result: Array<string>) => {

                this.countries = result;

                this.txtCountryKendo.loading = false;
            });
    }

    filterChangeCountry(countryFilter: string): void {
        this.countryCriteriaSubject.next(countryFilter);
    }

    public onValueChangeCountry(country: string): void {

        if (country) {
            this.router.navigate(['/details/country', country]);
        }
        else {
            this.router.navigate(['/']);
        }
    }

    ////////////Continent

    private initContinentSubject(): void {

        const contains = value => s =>
            s.toLowerCase().indexOf(value.toLowerCase()) !== -1;

        this.continentCriteriaSubject
            .debounceTime(500)
            .distinctUntilChanged()
            .do((): void => {
                this.txtContinentKendo.loading = true;
            })
            .switchMap((continentFilter: string): Observable<Array<string>> => {

                if (continentFilter.length >= 1) {
                    let filteredContinents = this.continentSource.filter(contains(continentFilter));

                    let result = new Array<string>();

                    if (filteredContinents && filteredContinents.length != 0) {

                        result = filteredContinents;
                    }

                    return Observable.of<Array<string>>(result);
                }
                else {
                    let result = new Array<string>();

                    if (continentFilter) {
                        result = this.continentSource;
                    }
                    else {
                        result = [];
                    }

                    return Observable.of<Array<string>>(result);
                }
            })
            .subscribe(
            (result: Array<string>) => {

                this.continents = result;

                this.txtContinentKendo.loading = false;
            });
    }

    filterChangeContinent(continentFilter: string): void {
        this.continentCriteriaSubject.next(continentFilter);
    }

    public onValueChangeContinent(continent: string): void {

        if (continent) {
            this.router.navigate(['/list/continent', continent]);
        }
        else {
            this.router.navigate(['/']);
        }
    }

    ////////////Country Priority
    public onValueChangeCountryPriority(countryPriority: CountryPriority): void {

        if (countryPriority) {
            this.router.navigate(['/list/priority', countryPriority.sequenceNumber]);
        }
        else {
            this.router.navigate(['/']);
        }
    }

    ////////////Visited
    public onValueChangeVisited(isVisited: boolean): void {

        if (isVisited) {
            this.router.navigate(['/list/visited/yes']);
        }
        else {
            this.router.navigate(['/list/visited/no']);
        }
    }

    ////////////Season
    public onSeachBySeasonClick(): void {

        if (this.selectedSeasonFrom || this.selectedSeasonFrom === 0) {

            let selectedSeasonFrom = this.helperService.getMonthNameBySequenceNumber(this.selectedSeasonFrom, this.seasonsSource);

            if (this.selectedSeasonTo || this.selectedSeasonTo === 0) {

                let selectedSeasonTo = this.helperService.getMonthNameBySequenceNumber(this.selectedSeasonTo, this.seasonsSource);

                this.router.navigate(['/list/season', selectedSeasonFrom, selectedSeasonTo]);
            }
            else {
                this.router.navigate(['/list/season', selectedSeasonFrom, selectedSeasonFrom]);
            }
        }
    }


    ////////////All
    public onValueChangeAll(isAll: boolean): void {

        if (isAll) {
            this.router.navigate(['/list/all']);
        }
        else {
            this.router.navigate(['/']);
        }
    }


    ////////////Buttons
    public onNewClick(): void {
        this.router.navigate(['/details/country']);
    }

    public onRestartClick(): void {
        this.router.navigate(['/']);
    }

    public onRefreshClick(): void {
        this.router.navigate([this.router.url]);
    }

    public onTestServer(): void {

        this.helperService.setLoading(true);

        this.httpService.testServer(this.selectedCountry).subscribe(
            (result: any) => {

                alert('OK');

                if (result.status == 'Success') {

                    console.log(result.message);
                }
                else {
                    console.log('Failed');
                }
            },
            (error: any) => {

                alert('Error');

                this.helperService.setLoading(false);

                console.log(JSON.stringify(error));
            },
            () => {

                this.helperService.setLoading(false);
            });
    }

    public onNewButtonsClick(dataItem: any): void {
        if (dataItem.id == 0) {
            this.router.navigate(['/details/country']);
        }
        else if (dataItem.id == 1) {
            this.router.navigate(['/group']);
        }
    }
}