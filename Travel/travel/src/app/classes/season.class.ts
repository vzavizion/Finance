import { Month } from '../classes/month.class';

export class Season {

    constructor() {
        this.month = new Month();
    }

    month: Month;

    range: string;  //mid early late

}


export class SeasonInfo {

    constructor() {
        this.seasonFrom = new Season();

        this.seasonTo = new Season();
    }

    seasonFrom: Season;

    seasonTo: Season;

    description: string;

    isNoVisit: boolean;
}
