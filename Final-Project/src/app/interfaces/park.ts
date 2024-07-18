export interface ParkResponse {
    total: number;
    data: Park[];
}

export interface Park {
    id: string;
    parkCode: string;
    name: string;
    description: string;
    designation: string;
    location: string;
    latLong: {
        lat: number;
        long: number;
    };
    latitude: string;
    longitude: string;
    activities: {
        id: string;
        name: string;
    }[];
    addresses:
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
        }[];
    directionsInfo: string;
    directionsUrl: string;
    entranceFees: {
        cost: number;
        description: string;
        title: string;
    }[];
    entrancePasses: 
        {
            cost: number;
            description: string;
            title: string;
        }[];
    images: 
        {
            title: string;
            url: string;
            altText: string;
        }[];
    operatingHours: {
        name: string;
        standardHours: {
            sunday: string;
            monday: string;
            tuesday: string;
            wednesday: string;
            thursday: string;
            friday: string;
            saturday: string;
        },
        exceptions: {
            name: string;
            startDate: string;
            endDate: string;
            exceptionHours: {
                sunday: string;
                monday: string;
                tuesday: string;
                wednesday: string;
                thursday: string;
                friday: string;
                saturday: string;
            },
            description: string;
        }[];
        weatherInfo: string;
    }[];
    localPhotoPath: string;
    relevanceScore: string;
}
