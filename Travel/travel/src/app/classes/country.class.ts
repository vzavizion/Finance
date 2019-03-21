import { CountryRegion } from '../classes/country-region.class';
import { CountryPriority } from '../classes/priority.class';
import { RegionBase } from '../classes/region-base.class';
import { Season, SeasonInfo } from '../classes/season.class';

export class Country extends RegionBase {

    constructor() {

        super();

        this.regions = new Array<CountryRegion>();

        this.seasons = new Array<SeasonInfo>();
    }

    currentName: string;

    continent: string;

    isVisited: boolean;

    priority: CountryPriority;

    regions: Array<CountryRegion>;

    seasons: Array<SeasonInfo>;

    exportDescription: string;
}

