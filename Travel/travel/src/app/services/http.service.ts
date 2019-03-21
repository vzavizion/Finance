import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

import { Country } from '../classes/country.class';

import { Group } from '../classes/group.class';

import { HttpOperationResult, HttpQueryResult } from '../classes/http-result.class'


@Injectable()
export class HttpService {

    //readonly urlBaseAddress: string = 'http://localhost:3000/';
    readonly urlBaseAddress: string = '';

    constructor(
        private http: HttpClient) {

    }

    testServer(country: string): any {
        return this.http.get(this.urlBaseAddress + 'api/country/test');
    }

    saveFile(country: Country): any {

        let options = {

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.post<HttpOperationResult<string>>(this.urlBaseAddress + 'api/country/saveFile', country, options);
    }

    getCountryNames(): Observable<HttpQueryResult<string>> {

        let options = {

            params: {

            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<string>>(this.urlBaseAddress + 'api/country/names', options);
    }

    getContinentNames(): Observable<HttpQueryResult<string>> {

        let options = {

            params: {

            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<string>>(this.urlBaseAddress + 'api/country/continents', options);
    }

    getGroupNames(): Observable<HttpQueryResult<string>> {

        let options = {

            params: {

            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<string>>(this.urlBaseAddress + 'api/group/names', options);
    }    

    getCountryAll(): Observable<HttpQueryResult<Country>> {

        let options = {

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Country>>(this.urlBaseAddress + 'api/country/getCountryAll', options);
    }

    getCountryByName(countryName: string): Observable<HttpQueryResult<Country>> {

        let options = {

            params: {
                countryName: countryName
            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Country>>(this.urlBaseAddress + 'api/country/getCountryByName', options);
    }

    getCountryByContinent(continent: string): Observable<HttpQueryResult<Country>> {

        let options = {

            params: {
                continent: continent
            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Country>>(this.urlBaseAddress + 'api/country/getCountryByContinent', options);
    }

    getCountryByCountryPriority(countryPriority: string): Observable<HttpQueryResult<Country>> {

        let options = {

            params: {
                countryPriority: countryPriority
            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Country>>(this.urlBaseAddress + 'api/country/getCountryByCountryPriority', options);
    }

    getCountryByIsVisited(isVisited: string): Observable<HttpQueryResult<Country>> {

        let options = {

            params: {
                isVisited: isVisited
            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Country>>(this.urlBaseAddress + 'api/country/getCountryByIsVisited', options);
    }

    getCountryBySeason(seasonFrom: number, seasonTo: number): Observable<HttpQueryResult<Country>> {

        let options = {

            params: {
                seasonFrom: seasonFrom.toString(),
                seasonTo: seasonTo.toString()
            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Country>>(this.urlBaseAddress + 'api/country/getCountryBySeason', options);
    }

    getGroupByName(groupName: string): Observable<HttpQueryResult<Group>> {

        let options = {

            params: {
                groupName: groupName
            },

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.get<HttpQueryResult<Group>>(this.urlBaseAddress + 'api/group/getGroupByName', options);
    }

    saveGroup(group: Group): Observable<HttpOperationResult<Group>> {

        let options = {

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.post<HttpOperationResult<Group>>(this.urlBaseAddress + 'api/group/save', group, options);
    }    
    

    saveCountry(country: Country): Observable<HttpOperationResult<Country>> {

        let options = {

            withCredentials: true,

            headers: {
                'X-UserName': 'VZ',
                'X-AppName': 'CAM50'
            }
        };

        return this.http.post<HttpOperationResult<Country>>(this.urlBaseAddress + 'api/country/save', country, options);
    }
}