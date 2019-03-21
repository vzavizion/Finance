import { Region } from '../classes/region.class';
import { Season, SeasonInfo } from '../classes/season.class';
import { CountryRegionPriority } from '../classes/priority.class';

export class CountryRegion extends Region {

    constructor() {
        super();

        this.seasons = new Array<SeasonInfo>();
    }

    priority: CountryRegionPriority;

    seasons: Array<SeasonInfo>;
}