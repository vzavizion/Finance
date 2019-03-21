import { Country } from '../classes/country.class';

export class CountryInGroup {
    country: Country;
    sequenceNumber: number;
}

export class Group {

    constructor() {

        this.countryNames = new Array<string>();

        this.countries = new Array<CountryInGroup>();
    }

    name: string;

    currentName: string;    

    description: string;

    countryNames: Array<string>;

    countries: Array<CountryInGroup>;
}

