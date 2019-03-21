import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Country } from '../classes/country.class';
import { Group, CountryInGroup } from '../classes/group.class';

import { HttpOperationResult, HttpQueryResult } from '../classes/http-result.class'

import { HelperService } from '../services/helper.service';
import { HttpService } from '../services/http.service';

import { State, FilterDescriptor, process, SortDescriptor, orderBy } from '@progress/kendo-data-query';

import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

@Component({
    selector: 'app-groups-list',
    templateUrl: '../html/groups-list.component.html',
    styleUrls: ['../css/groups-list.component.css']
})

export class GroupsList implements OnInit {

    groups: Array<string>;
    groupsSource: Array<string>;

    countries: Array<string>;
    countriesSource: Array<string>;

    group: Group;
    selectedGroup: string;

    @ViewChild('txtGroupKendo') txtGroupKendo;
    @ViewChild('txtCountryKendo') txtCountryKendo;

    private groupCriteriaSubject = new Subject<string>();
    private countryCriteriaSubject = new Subject<string>();

    public sort: SortDescriptor[] = [{
        field: 'sequenceNumber',
        dir: 'asc'
    }];

    public state: State = {
        filter: {
            logic: 'and',
            filters: [{ field: 'name', operator: 'contains', value: 'a' }]
        }
    };

    constructor(
        private helperService: HelperService,
        private httpService: HttpService,
        private router: Router,
        private route: ActivatedRoute) {

        this.initEmptyGroup();
    };

    title = 'Groups List';

    ngOnInit(): void {
        this.initRouteData();

        this.initGroups();

        this.initCountries();

        this.initGroupsSubject();

        this.initCountrySubject();
    }

    initRouteData() {

        this.route.url.subscribe((url) => {

            var groupSegment = url.find(s => s.path.toLowerCase() == 'group');

            if (groupSegment) {
                this.selectedGroup = this.route.snapshot.paramMap.get('id');

                if (this.selectedGroup) {

                    this.getGroupByName();
                }
                else {
                    this.initEmptyGroup();
                }
            }
            else {
                this.selectedGroup = '';

                this.initEmptyGroup();
            }
        });

    }

    initEmptyGroup(): void {

        this.group = new Group();
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

    initGroups(): void {

        this.httpService.getGroupNames().subscribe(
            (result: HttpQueryResult<string>) => {

                if (result && result.status == 'Success' && result.result) {

                    this.groupsSource = result.result;

                    this.groups = this.groupsSource;
                }
                else {

                    this.groupsSource = [];
                    this.groups = this.groupsSource;
                }
            },
            (error: any) => {

                this.groupsSource = [];
                this.groups = this.groupsSource;

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

    public onValueChangeCountry(countryName: string): void {

        this.helperService.setLoading(true);

        this.httpService.getCountryByName(countryName).subscribe(
            (result: HttpQueryResult<Country>) => {

                if (result && result.status == 'Success' && result.result && result.result.length != 0) {

                    let countryInGroup = new CountryInGroup();
                    countryInGroup.country = result.result[0];
                    countryInGroup.sequenceNumber = -1;

                    this.group.countries.push(countryInGroup);

                    for (let country of this.group.countries) {
                        country.sequenceNumber++;
                    }

                    this.group.countryNames.push(countryName);
                }
                else {

                    console.log('No Country with name' + countryName);
                }
            },
            (error: any) => {

                this.helperService.setLoading(false);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);
            });
    }

    ////////////Group

    private initGroupsSubject(): void {

        const contains = value => s =>
            s.toLowerCase().indexOf(value.toLowerCase()) !== -1;

        this.groupCriteriaSubject
            .debounceTime(500)
            .distinctUntilChanged()
            .do((): void => {
                this.txtGroupKendo.loading = true;
            })
            .switchMap((groupFilter: string): Observable<Array<string>> => {

                if (groupFilter.length >= 1) {
                    let filteredGroups = this.groupsSource.filter(contains(groupFilter));

                    let result = new Array<string>();

                    if (filteredGroups && filteredGroups.length != 0) {

                        result = filteredGroups;
                    }

                    return Observable.of<Array<string>>(result);
                }
                else {
                    let result = new Array<string>();

                    if (groupFilter) {
                        result = this.groupsSource;
                    }
                    else {
                        result = [];
                    }

                    return Observable.of<Array<string>>(result);
                }
            })
            .subscribe(
            (result: Array<string>) => {

                this.groups = result;

                this.txtGroupKendo.loading = false;
            });
    }

    filterChangeGroup(groupFilter: string): void {
        this.groupCriteriaSubject.next(groupFilter);
    }

    public onValueChangeGroup(group: string): void {

        if (group) {
            this.router.navigate(['/group', group]);
        }
        else {
            this.router.navigate(['/']);
        }
    }


    //Groups data
    getGroupByName(): void {

        this.helperService.setLoading(true);

        this.httpService.getGroupByName(this.selectedGroup).subscribe(
            (result: HttpQueryResult<Group>) => {

                if (result && result.status == 'Success' && result.result && result.result.length != 0) {

                    this.group = result.result[0];

                    this.group.currentName = this.group.name;

                    this.group.countries = new Array<CountryInGroup>();

                    for (let countryName of this.group.countryNames) {
                        this.httpService.getCountryByName(countryName).subscribe(
                            (resultCountry: HttpQueryResult<Country>) => {

                                if (resultCountry && resultCountry.status == 'Success' && resultCountry.result && resultCountry.result.length != 0) {

                                    let countryInGroup = new CountryInGroup();
                                    countryInGroup.country = resultCountry.result[0];
                                    countryInGroup.sequenceNumber = this.group.countryNames.indexOf(countryName);

                                    this.group.countries.push(countryInGroup);
                                }
                                else {

                                    console.log('No Country with name' + countryName);
                                }
                            },
                            (error: any) => {

                                if (this.group.countries.length == this.group.countryNames.length) {
                                    this.helperService.setLoading(false);
                                }

                                console.log(JSON.stringify(error));
                            },
                            () => {

                                if (this.group.countries.length == this.group.countryNames.length) {
                                    this.helperService.setLoading(false);

                                    this.group.countries = orderBy(this.group.countries, this.sort);
                                }
                            });
                    }
                }
                else {

                    this.helperService.setLoading(false);

                    this.initEmptyGroup();

                    console.log('No Country with name' + this.selectedGroup);
                }
            },
            (error: any) => {

                this.helperService.setLoading(false);

                this.initEmptyGroup();

                console.log(JSON.stringify(error));
            },
            () => {

            });
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.group.countries = orderBy(this.group.countries, this.sort);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.group.countries = process(this.group.countries, this.state).data;
    }

    public removeHandler({ sender, dataItem }) {

        let index = this.group.countries.indexOf(dataItem);
        if (index != -1) {
            this.group.countries.splice(index, 1);
        }

        index = this.group.countryNames.indexOf(dataItem.name);
        if (index != -1) {
            this.group.countryNames.splice(index, 1);
        }
    }

    public onNewClick(): void {
        this.router.navigate(['/group']);
    }

    public onRefreshClick(): void {
        this.router.navigate([this.router.url]);
    }

    public save(grid: any): void {

        this.helperService.setLoading(true);

        this.httpService.saveGroup(this.group).subscribe(
            (result: HttpOperationResult<Group>) => {

                console.log(result);

                this.router.navigate(['/group', this.group.name]);
            },
            (error: any) => {

                this.helperService.setLoading(false);

                console.log(JSON.stringify(error));
            },
            () => {
                this.helperService.setLoading(false);

            });
    }

    //Drag and Drop    
    public drag(event, rowIndex) {
        this.helperService.drag(event, rowIndex);
    }

    public drop(event, rowIndex) {
        this.helperService.drop(event, rowIndex, this.group.countries);

        this.helperService.drop(event, rowIndex, this.group.countryNames);
    }

    public dragover(event, rowIndex) {
        this.helperService.dragover(event, rowIndex);
    }

    //Export file
    public saveFile(grid: any): void {

        this.helperService.setLoading(true);

        let countryExport = new Country();
        countryExport.name = 'Multiple';

        let exportCountries = this.group.countries.map(item => {
            return item.country;
        });

        countryExport.exportDescription = this.helperService.getExportFiles(exportCountries);

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
