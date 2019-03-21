import { Injectable } from '@angular/core';

import { Country } from '../classes/country.class';
import { Region } from '../classes/region.class';
import { CountryRegion } from '../classes/country-region.class';
import { CountryPriority, CountryRegionPriority } from '../classes/priority.class';
import { Season } from '../classes/season.class';
import { Month } from '../classes/month.class';

import { SearchCriteria } from '../classes/search-criteria.class';

import { Subject } from "rxjs/Subject";

const tableRow = node => node.tagName.toLowerCase() === 'tr';

const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }

    return node;
};

@Injectable()
export class HelperService {

    draggedItemIndex: number;

    constructor() {
    }

    getSeasons(): Array<Month> {
        let seasonsSource = new Array<Month>();

        seasonsSource.push({ name: 'January', sequenceNumber: 0 });
        seasonsSource.push({ name: 'February', sequenceNumber: 1 });
        seasonsSource.push({ name: 'March', sequenceNumber: 2 });
        seasonsSource.push({ name: 'April', sequenceNumber: 3 });
        seasonsSource.push({ name: 'May', sequenceNumber: 4 });
        seasonsSource.push({ name: 'June', sequenceNumber: 5 });
        seasonsSource.push({ name: 'July', sequenceNumber: 6 });
        seasonsSource.push({ name: 'August', sequenceNumber: 7 });
        seasonsSource.push({ name: 'September', sequenceNumber: 8 });
        seasonsSource.push({ name: 'October', sequenceNumber: 9 });
        seasonsSource.push({ name: 'November', sequenceNumber: 10 });
        seasonsSource.push({ name: 'December', sequenceNumber: 11 });

        return seasonsSource;
    }

    getRange(): Array<string> {

        let rangeSource = new Array<string>();

        rangeSource.push('');
        rangeSource.push('mid');
        rangeSource.push('early');
        rangeSource.push('late');

        return rangeSource;
    }

    getMonthNameBySequenceNumber(sequenceNumber: number, seasons: Array<Month>): string {

        let name: string;

        let month = seasons.find(s => s.sequenceNumber == sequenceNumber);

        if (month) {
            name = month.name;
        }

        return name;
    }

    getMonthSequenceNumberByName(name: string, seasons: Array<Month>): number {

        let sequenceNumber: number;

        let month = seasons.find(s => s.name == name);

        if (month) {
            sequenceNumber = month.sequenceNumber;
        }

        return sequenceNumber;
    }

    getContinents(): Array<string> {

        let continents = new Array<string>();

        continents.push('Australia');
        continents.push('Oceania');
        continents.push('Africa');
        continents.push('South America');
        continents.push('North America');
        continents.push('Asia');
        continents.push('Europe');

        continents.sort((n1, n2) => {
            if (n1 > n2) {
                return 1;
            }

            if (n1 < n2) {
                return -1;
            }

            return 0;
        });

        return continents;
    }

    getCountryRegionPriority(): Array<CountryRegionPriority> {

        let regionPriorities = new Array<CountryRegionPriority>();

        let regionPriority0 = new CountryRegionPriority();
        regionPriority0.name = '!!!';
        regionPriority0.sequenceNumber = 0;

        let regionPriority1 = new CountryRegionPriority();
        regionPriority1.name = '!';
        regionPriority1.sequenceNumber = 1;

        let regionPriority2 = new CountryRegionPriority();
        regionPriority2.name = '?';
        regionPriority2.sequenceNumber = 2;

        let regionPriority3 = new CountryRegionPriority();
        regionPriority3.name = '???';
        regionPriority3.sequenceNumber = 3;

        regionPriorities.push(regionPriority0);
        regionPriorities.push(regionPriority1);
        regionPriorities.push(regionPriority2);
        regionPriorities.push(regionPriority3);

        return regionPriorities;
    }

    getCountryPriority(): Array<CountryPriority> {

        let countryPriorities = new Array<CountryPriority>();

        let countryPriority0 = new CountryPriority();
        countryPriority0.name = 'Prority 0 - Must Visit Right Now';
        countryPriority0.sequenceNumber = 0;
        countryPriority0.description = '!!! First choice (have to go here right now!!!)';

        let countryPriority1 = new CountryPriority();
        countryPriority1.name = 'Prority 1 - Must Visit Now';
        countryPriority1.sequenceNumber = 1;
        countryPriority1.description = '!!! Must visit right now (have to go here!!!)';

        let countryPriority2 = new CountryPriority();
        countryPriority2.name = 'Prority 2 - Must Visit';
        countryPriority2.sequenceNumber = 2;
        countryPriority2.description = '! Must visit, but later (have to go here, maybe not right now)';


        let countryPriority3 = new CountryPriority();
        countryPriority3.name = 'Prority 3 - Visit later (must visit)';
        countryPriority3.sequenceNumber = 3;
        countryPriority3.description = 'Visit later (must visit - have to go here sometime in the future)';

        let countryPriority4 = new CountryPriority();
        countryPriority4.name = 'Prority 4 - Visit later (optional)';
        countryPriority4.sequenceNumber = 4;
        countryPriority4.description = '? Visit later (optional/must visit - no hard feelings if we do not go here as not a lot of sightseeing)';


        let countryPriority5 = new CountryPriority();
        countryPriority5.name = 'Prority 5 - Maybe visit';
        countryPriority5.sequenceNumber = 5;
        countryPriority5.description = '??? Maybe visit, maybe not (no real need to go here as no sightseeing) - not visited (optional)';

        let countryPriority6 = new CountryPriority();
        countryPriority6.name = 'Prority 6 - No need to visit';
        countryPriority6.sequenceNumber = 6;
        countryPriority6.description = '??? No need to visit';


        let countryPriority7 = new CountryPriority();
        countryPriority7.name = 'Prority 7 - Visited';
        countryPriority7.sequenceNumber = 7;
        countryPriority7.description = 'Visited - no need to re-visit';

        countryPriorities.push(countryPriority0);
        countryPriorities.push(countryPriority1);
        countryPriorities.push(countryPriority2);
        countryPriorities.push(countryPriority3);
        countryPriorities.push(countryPriority4);
        countryPriorities.push(countryPriority5);
        countryPriorities.push(countryPriority6);
        countryPriorities.push(countryPriority7);

        return countryPriorities;
    }

    /////Loading...
    // Observable source
    private loadingSubject = new Subject<boolean>();

    // Observable stream
    loadingMessage = this.loadingSubject.asObservable();

    // Service command
    setLoading(isLoading: boolean) {
        this.loadingSubject.next(isLoading);
    }


    /////Search Criteria
    // Observable source
    private searchCriteriaSubject = new Subject<SearchCriteria>();

    // Observable stream
    searchCriteriaMessage = this.searchCriteriaSubject.asObservable();

    // Service command
    setSearchCriteria(searchCriteria: SearchCriteria) {
        this.searchCriteriaSubject.next(searchCriteria);
    }


    /////Export to file
    getExportFiles(countries: Array<Country>): string {

        let fileString = '';

        let tab = '\t';
        let newLine = '\r\n';

        let separator = '===================================';

        for (let country of countries) {

            fileString = fileString + this.getExportFile(country);

            fileString = fileString +
                separator + newLine +
                separator + newLine +
                separator + newLine +
                newLine +
                newLine +
                newLine;
        }

        return fileString;
    }

    getExportFile(country: Country): string {

        let fileString = '';

        let tab = '\t';
        let newLine = '\r\n';
        let newLineOnly = '\n';
        var newLineOnlyReplacement = new RegExp(newLineOnly, "g");

        fileString = '--' + fileString + country.priority.name + newLine;
        fileString = fileString + country.name + newLine;


        //Season
        let visit = country.seasons.filter(s => !s.isNoVisit);

        if (visit) {
            let visitOther = visit.filter(s => s.description && s.description != '2nd choice');

            for (let s of visitOther) {
                fileString = fileString + (s.description ? tab + '--' + s.description + newLine : '');
                fileString = fileString + tab + (s.seasonFrom.range ? s.seasonFrom.range + ' ' : '') + s.seasonFrom.month.name + ' - ' + (s.seasonTo.range ? s.seasonTo.range + ' ' : '') + s.seasonTo.month.name + newLine;
                fileString = fileString + newLine;
            }

            let visitMain = visit.filter(s => !s.description);

            for (let s of visitMain) {
                fileString = fileString + (s.description ? tab + '--' + s.description + newLine : '');
                fileString = fileString + tab + (s.seasonFrom.range ? s.seasonFrom.range + ' ' : '') + s.seasonFrom.month.name + ' - ' + (s.seasonTo.range ? s.seasonTo.range + ' ' : '') + s.seasonTo.month.name + newLine;
            }

            let visit2ndChoice = visit.filter(s => s.description == '2nd choice');

            for (let s of visit2ndChoice) {
                fileString = fileString + (s.description ? tab + '--' + s.description + newLine : '');
                fileString = fileString + tab + (s.seasonFrom.range ? s.seasonFrom.range + ' ' : '') + s.seasonFrom.month.name + ' - ' + (s.seasonTo.range ? s.seasonTo.range + ' ' : '') + s.seasonTo.month.name + newLine;
            }

            fileString = fileString + newLine;
        }


        let noVisit = country.seasons.filter(s => s.isNoVisit);

        if (noVisit) {
            for (let s of noVisit) {
                fileString = fileString + tab + 'no ' + (s.seasonFrom.range ? s.seasonFrom.range + ' ' : '') + s.seasonFrom.month.name + ' - ' + (s.seasonTo.range ? s.seasonTo.range + ' ' : '') + s.seasonTo.month.name + ' - ' + s.description + newLine;
            }

            fileString = fileString + newLine + newLine;
        }


        //Country Regions
        for (let countryRegion of country.regions) {

            fileString = fileString + tab + (countryRegion.priority ? countryRegion.priority.name : 'N/A') + newLine;
            fileString = fileString + tab + countryRegion.name + newLine;

            if (countryRegion.regions) {
                for (let region of countryRegion.regions) {

                    fileString = fileString + tab + tab + region.name + newLine;

                    if (region.places) {
                        for (let place of region.places) {
                            fileString = fileString + tab + tab + tab + (place.name ? place.name.replace(newLineOnlyReplacement, newLineOnly + tab + tab + tab) : '') + newLine;
                        }
                    }

                    fileString = fileString + newLine;
                }
            }

            if (countryRegion.places) {
                for (let place of countryRegion.places) {
                    fileString = fileString + tab + tab + (place.name ? place.name.replace(newLineOnlyReplacement, newLineOnly + tab + tab) : '') + newLine;
                }
            }

            fileString = fileString + newLine;

            if (countryRegion.seasons) {

                let visit = countryRegion.seasons.filter(s => !s.isNoVisit);

                if (visit) {
                    for (let s of visit) {
                        fileString = fileString + (s.description ? tab + tab + '--' + s.description + newLine : '');
                        fileString = fileString + tab + tab + (s.seasonFrom.range ? s.seasonFrom.range + ' ' : '') + s.seasonFrom.month.name + ' - ' + (s.seasonTo.range ? s.seasonTo.range + ' ' : '') + s.seasonTo.month.name + newLine;
                    }

                    fileString = fileString + newLine;
                }

                let noVisit = countryRegion.seasons.filter(s => s.isNoVisit);

                if (noVisit) {
                    for (let s of noVisit) {
                        fileString = fileString + tab + tab + 'no ' + (s.seasonFrom.range ? s.seasonFrom.range + ' ' : '') + s.seasonFrom.month.name + ' - ' + (s.seasonTo.range ? s.seasonTo.range + ' ' : '') + s.seasonTo.month.name + ' - ' + s.description + newLine;
                    }

                    fileString = fileString + newLine + newLine;
                }
            }
        }



        return fileString;
    }



    ////Drag and Drop    
    public drag(event, rowIndex) {
        this.draggedItemIndex = rowIndex;
    }

    public drop(event, rowIndex, dataArray) {
        event.preventDefault();

        let dataItem = dataArray.splice(this.draggedItemIndex, 1)[0];
        let dropIndex = closest(event.target, tableRow).rowIndex;
        dataArray.splice(dropIndex, 0, dataItem);
    }

    public dragover(event, rowIndex) {
        event.preventDefault();
    }
}