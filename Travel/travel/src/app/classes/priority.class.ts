export class Priority {

    name: string;
    sequenceNumber: number;
}

export class CountryRegionPriority extends Priority {

}

export class CountryPriority extends Priority {

    description: string;
}