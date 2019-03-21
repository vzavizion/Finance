import { Component } from '@angular/core';

import { OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Country } from '../classes/country.class';
import { Region } from '../classes/region.class';
import { CountryRegion } from '../classes/country-region.class';
import { Season, SeasonInfo } from '../classes/season.class';

import { Month } from '../classes/month.class';
import { CountryPriority, CountryRegionPriority } from '../classes/priority.class';
import { SearchCriteria } from '../classes/search-criteria.class';

import { HttpOperationResult, HttpQueryResult } from '../classes/http-result.class'

import { HelperService } from '../services/helper.service';
import { HttpService } from '../services/http.service';


@Component({
    selector: 'app-details-info',
    templateUrl: '../html/details-info.component.html',
    styleUrls: ['../css/details-info.component.css']
})

export class DetailsInfo implements OnInit, AfterViewInit {

    selectedCountry: string;

    country: Country;

    continentSource: Array<string>;

    seasonsSource: Array<Month>;

    seasonsRangeSource: Array<string>;

    countryPrioritiesSource: Array<CountryPriority> = [];
    countryRegionPrioritiesSource: Array<CountryRegionPriority> = [];

    private editedRowIndex: number;
    private editedColumnIndex: number;
    private editedRowItem: CountryRegion;


    constructor(
        private helperService: HelperService,
        private httpService: HttpService,
        private router: Router,
        private route: ActivatedRoute) {

        this.initEmptyCountry(false);

        this.continentSource = this.helperService.getContinents();

        this.countryPrioritiesSource = this.helperService.getCountryPriority();
        this.countryRegionPrioritiesSource = this.helperService.getCountryRegionPriority();

        this.seasonsSource = this.helperService.getSeasons();

        this.seasonsRangeSource = helperService.getRange();
    };

    title = 'Details Info';

    ngOnInit(): void {
        this.initRouteData();
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {

    }

    initRouteData() {

        this.route.url.subscribe((url) => {

            var countrySegment = url.find(s => s.path.toLowerCase() == 'country');

            if (countrySegment) {
                this.selectedCountry = this.route.snapshot.paramMap.get('id');

                if (this.selectedCountry) {

                    this.getCountryByName(this.selectedCountry);
                }
                else {
                    this.initEmptyCountry(true);
                }
            }
            else {
                this.selectedCountry = '';

                this.initEmptyCountry(true);
            }
        });
    }

    initEmptyCountry(isUpdateSearchCriteria: boolean): void {

        this.country = new Country();

        this.country.isVisited = false;

        if (isUpdateSearchCriteria) {
            this.setSearchCriteria();
        }
    }

    getCountryByName(countryName: string): void {

        this.helperService.setLoading(true);

        this.httpService.getCountryByName(this.selectedCountry).subscribe(
            (result: HttpQueryResult<Country>) => {

                if (result && result.status == 'Success' && result.result && result.result.length != 0) {

                    this.country = result.result[0];

                    this.country.currentName = this.country.name;

                    if (!this.country.seasons) {
                        this.country.seasons = new Array<SeasonInfo>();
                    }

                    for (let countryRegion of this.country.regions) {
                        if (!countryRegion.seasons) {
                            countryRegion.seasons = new Array<SeasonInfo>();
                        }
                    }
                }
                else {

                    this.initEmptyCountry(true);

                    console.log('No Country with name' + this.selectedCountry);
                }

                this.setSearchCriteria();
            },
            (error: any) => {

                this.helperService.setLoading(false);

                this.initEmptyCountry(true);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);


            });
    }

    //Search Criteria        
    setSearchCriteria(): void {

        let searchCriteria = new SearchCriteria();

        searchCriteria.country = this.country.name;

        this.helperService.setSearchCriteria(searchCriteria);
    }

    public onRefreshClick(): void {
        this.router.navigate([this.router.url]);
    }

    ////////////Grid
    public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
        if (!isEdited || this.editedRowIndex != rowIndex) {
            this.closeEditor(sender);

            this.editedRowIndex = rowIndex;
            this.editedColumnIndex = columnIndex;

            this.editedRowItem = Object.assign({}, dataItem);

            sender.editRow(rowIndex);
        }
    }

    public cellCloseHandler(args: any) {
        alert('Closed');
    }

    public addHandler({ sender }) {

        this.closeEditor(sender);

        let countryRegion = new CountryRegion();
        this.country.regions.push(countryRegion);

        this.editedRowIndex = this.country.regions.length - 1;
        this.editedColumnIndex = 0;
        this.editedRowItem = countryRegion;

        sender.editRow(this.country.regions.length - 1);
    }

    public removeHandler({ sender, dataItem }) {
        this.closeEditor(sender);

        this.country.regions = this.country.regions.filter(r => r.name != dataItem.name);
    }

    public save(grid: any): void {

        this.closeEditor(grid);

        this.helperService.setLoading(true);

        this.httpService.saveCountry(this.country).subscribe(
            (result: HttpOperationResult<Country>) => {

                console.log(result);

                this.router.navigate(['/details/country', this.country.name]);
            },
            (error: any) => {

                this.helperService.setLoading(false);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

            });
    }    

    public cancelChanges(grid: any): void {
        this.closeEditor(grid);
    }

    public saveChanges(grid: any): void {

        this.closeEditor(grid);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
    }

    //Drag and Drop    
    public drag(event, rowIndex) {
        this.helperService.drag(event, rowIndex);
    }

    public drop(event, rowIndex) {
        this.helperService.drop(event, rowIndex, this.country.regions);
    }

    public dragover(event, rowIndex) {
        this.helperService.dragover(event, rowIndex);
    }

    //Export file
    public saveFile(grid: any): void {

        this.closeEditor(grid);

        this.helperService.setLoading(true);

        this.country.exportDescription = this.helperService.getExportFile(this.country);

        this.httpService.saveFile(this.country).subscribe(
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
