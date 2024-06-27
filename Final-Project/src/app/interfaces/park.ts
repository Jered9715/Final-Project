export interface ParkResponse {
    total: number;
    data: Park[];
}

export interface Park {
    id: string;
    name: string;
    description: string;
    location: string;
    activities: [{
        id: string;
        name: string;
    }];
    addresses: [
        {
            line1: string;
            line2: string;
            line3: string;
            city: string;
            stateCode: string;
            countryCode: string;
            provinceTerritoryCode: string;
            postalCode: string;
            type: string;
        }
    ];
    directionsInfo: string;
    directionsUrl: string;
    entranceFees: [{
        cost: number;
        description: string;
        title: string;
    }];
    entrancePasses: [
        {
            cost: number;
            description: string;
            title: string;
        }
    ];
    images: [
        {
            title: string;
            url: string;
        }
    ];
    operatingHours: [{
        name: string;
        standardHours: [{
            sunday: string;
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
        }],
        exceptions: [{
            name: string;
            startDate: string;
            endDate: string;
            exceptionHours: [{
                sunday: string;
                monday: string;
                tuesday: string;
                wednesday: string;
                thursday: string;
                friday: string;
                saturday: string;
            }],
            description: string;
        }];
        weatherInfo: string;
    }]
}