import { RegionBase } from '../classes/region-base.class';
import { Place } from '../classes/place.class';

export class Region extends RegionBase {

    constructor() {

        super();

        this.regions = new Array<Region>();

        this.places = new Array<Place>();

        this.isNestedRegions = true;
    }

    description: string;

    regions: Array<Region>;

    places: Array<Place>;

    isNestedRegions: boolean;
}
