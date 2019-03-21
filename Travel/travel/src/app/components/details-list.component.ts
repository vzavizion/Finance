import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Country } from '../classes/country.class';
import { Region } from '../classes/region.class';
import { CountryRegion } from '../classes/country-region.class';
import { Season } from '../classes/season.class';
import { Month } from '../classes/month.class';

import { SearchCriteria } from '../classes/search-criteria.class';

import { HttpOperationResult, HttpQueryResult } from '../classes/http-result.class'

import { HelperService } from '../services/helper.service';
import { HttpService } from '../services/http.service';

import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
    selector: 'app-details-list',
    templateUrl: '../html/details-list.component.html',
    styleUrls: ['../css/details-list.component.css']
})

export class DetailsList implements OnInit {

    selectedContinent: string;
    selectedCountryPriority: string;
    selectedIsVisited: string;
    selectedIsAll: boolean;
    selectedSeasonFrom: string;
    selectedSeasonTo: string;

    seasonsSource: Array<Month>;

    countries: Array<Country>;

    public sort: SortDescriptor[] = [{
        field: 'name',
        dir: 'asc'
    }];

    constructor(
        private helperService: HelperService,
        private httpService: HttpService,
        private router: Router,
        private route: ActivatedRoute) {

        this.seasonsSource = this.helperService.getSeasons();

        this.initEmptyCountryList(false);
    };

    title = 'Details List';

    ngOnInit(): void {
        this.initRouteData();
    }

    initRouteData() {

        this.route.url.subscribe((url) => {

            var continentSegment = url.find(s => s.path.toLowerCase() == 'continent');

            if (continentSegment) {
                this.selectedContinent = this.route.snapshot.paramMap.get('id');

                if (this.selectedContinent) {

                    this.getCountryByContinent();
                }
                else {
                    this.initEmptyCountryList(true);
                }
            }
            else {
                this.selectedContinent = '';

                this.initEmptyCountryList(true);
            }


            var countryPrioritySegment = url.find(s => s.path.toLowerCase() == 'priority');

            if (countryPrioritySegment) {
                this.selectedCountryPriority = this.route.snapshot.paramMap.get('id');

                if (this.selectedCountryPriority) {

                    this.getCountryByCountryPriority();
                }
                else {
                    this.initEmptyCountryList(true);
                }
            }
            else {
                this.selectedCountryPriority = '';

                this.initEmptyCountryList(true);
            }


            var isVisitedSegment = url.find(s => s.path.toLowerCase() == 'visited');

            if (isVisitedSegment) {
                this.selectedIsVisited = this.route.snapshot.paramMap.get('id');

                if (this.selectedIsVisited) {

                    this.getCountryByIsVisited();
                }
                else {
                    this.initEmptyCountryList(true);
                }
            }
            else {
                this.selectedIsVisited = '';

                this.initEmptyCountryList(true);
            }

            var isAllSegment = url.find(s => s.path.toLowerCase() == 'all');

            if (isAllSegment) {
                this.selectedIsAll = true;

                this.getCountryByIsAll();
            }
            else {
                this.selectedIsAll = false;

                this.initEmptyCountryList(true);
            }

            var seasonSegment = url.find(s => s.path.toLowerCase() == 'season');

            if (seasonSegment) {
                this.selectedSeasonFrom = this.route.snapshot.paramMap.get('seasonFrom');
                this.selectedSeasonTo = this.route.snapshot.paramMap.get('seasonTo');

                if (this.selectedSeasonFrom) {
                    this.getCountryBySeason(this.selectedSeasonFrom, this.selectedSeasonTo);
                }
                else {
                    this.initEmptyCountryList(true);
                }
            }
            else {
                this.selectedSeasonFrom = '';
                this.selectedSeasonTo = '';

                this.initEmptyCountryList(true);
            }
        });
    }

    initEmptyCountryList(isUpdateSearchCriteria: boolean): void {

        this.countries = [];

        if (isUpdateSearchCriteria) {
            this.setSearchCriteria();
        }
    }

    getCountryByContinent(): void {

        this.helperService.setLoading(true);

        this.httpService.getCountryByContinent(this.selectedContinent).subscribe(
            (result: HttpQueryResult<Country>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.countries = result.result;
                }
                else {

                    this.initEmptyCountryList(true);

                    console.log('No Country with name ' + this.selectedContinent);
                }

                this.setSearchCriteria();
            },
            (error: any) => {

                this.helperService.setLoading(false);

                this.initEmptyCountryList(true);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

                this.setSearchCriteria();

                this.countries = orderBy(this.countries, this.sort);
            });
    }


    getCountryByCountryPriority(): void {

        this.helperService.setLoading(true);

        this.httpService.getCountryByCountryPriority(this.selectedCountryPriority).subscribe(
            (result: HttpQueryResult<Country>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.countries = result.result;
                }
                else {

                    this.initEmptyCountryList(true);

                    console.log('No Country with name ' + this.selectedCountryPriority);
                }

                this.setSearchCriteria();
            },
            (error: any) => {

                this.helperService.setLoading(false);

                this.initEmptyCountryList(true);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

                this.setSearchCriteria();

                this.countries = orderBy(this.countries, this.sort);
            });
    }


    getCountryByIsVisited(): void {

        this.helperService.setLoading(true);

        this.httpService.getCountryByIsVisited(this.selectedIsVisited).subscribe(
            (result: HttpQueryResult<Country>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.countries = result.result;
                }
                else {

                    this.initEmptyCountryList(true);

                    console.log('No Country with name ' + this.selectedIsVisited);
                }

                this.setSearchCriteria();
            },
            (error: any) => {

                this.helperService.setLoading(false);

                this.initEmptyCountryList(true);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

                this.setSearchCriteria();

                this.countries = orderBy(this.countries, this.sort);
            });
    }


    getCountryByIsAll(): void {

        this.helperService.setLoading(true);

        this.httpService.getCountryAll().subscribe(
            (result: HttpQueryResult<Country>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.countries = result.result;
                }
                else {

                    this.initEmptyCountryList(true);

                    console.log('No Country with name ' + this.selectedIsAll);
                }

                this.setSearchCriteria();
            },
            (error: any) => {

                this.helperService.setLoading(false);

                this.initEmptyCountryList(true);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

                this.setSearchCriteria();

                this.countries = orderBy(this.countries, this.sort);
            });
    }

    getCountryBySeason(selectedSeasonFrom: string, selectedSeasonTo: string): void {

        let selectedSeasonFromSequenceNumber: number;
        let selectedSeasonToSequenceNumber: number;

        selectedSeasonFromSequenceNumber = this.helperService.getMonthSequenceNumberByName(selectedSeasonFrom, this.seasonsSource);
        selectedSeasonToSequenceNumber = this.helperService.getMonthSequenceNumberByName(selectedSeasonTo, this.seasonsSource);

        if ((selectedSeasonFromSequenceNumber || selectedSeasonFromSequenceNumber === 0) && (selectedSeasonToSequenceNumber || selectedSeasonToSequenceNumber === 0)) {

            this.helperService.setLoading(true);

            this.httpService.getCountryBySeason(selectedSeasonFromSequenceNumber, selectedSeasonToSequenceNumber).subscribe(
                (result: HttpQueryResult<Country>) => {

                    if (result && result.status == 'Success' && result.result) {

                        this.countries = result.result;
                    }
                    else {

                        this.initEmptyCountryList(true);

                        console.log('No Country with name ' + this.selectedSeasonFrom + this.selectedSeasonTo);
                    }

                    this.setSearchCriteria();
                },
                (error: any) => {

                    this.helperService.setLoading(false);

                    this.initEmptyCountryList(true);

                    console.log(JSON.stringify(error));
                },
                () => {
                    this.helperService.setLoading(false);

                    this.setSearchCriteria();

                    this.countries = orderBy(this.countries, this.sort);
                });
        }
    }

    //Search Criteria        
    setSearchCriteria(): void {

        let searchCriteria = new SearchCriteria();

        searchCriteria.country = '';
        searchCriteria.continent = this.selectedContinent;

        searchCriteria.countryPriority = this.selectedCountryPriority;
        searchCriteria.isVisited = this.selectedIsVisited;
        searchCriteria.isAll = this.selectedIsAll;

        searchCriteria.continent = this.selectedContinent;
        searchCriteria.seasonFrom = this.helperService.getMonthSequenceNumberByName(this.selectedSeasonFrom, this.seasonsSource);
        searchCriteria.seasonTo = this.helperService.getMonthSequenceNumberByName(this.selectedSeasonTo, this.seasonsSource);

        this.helperService.setSearchCriteria(searchCriteria);
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.countries = orderBy(this.countries, this.sort);
    }

    //Export file
    public saveFile(grid: any): void {

        this.helperService.setLoading(true);

        let countryExport = new Country();
        countryExport.name = 'Multiple';

        countryExport.exportDescription = this.helperService.getExportFiles(this.countries);

        this.httpService.saveFile(countryExport).subscribe(
            (result: HttpOperationResult<string>) => {

                console.log(result);
            },
            (error: any) => {

                this.helperService.setLoading(false);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

            });
    }
}
