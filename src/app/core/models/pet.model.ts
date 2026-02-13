export interface Location {
    lat: number;
    lng: number;
    lastUpdated: Date;
}

export type PetStatus = 'safe' | 'alert' | 'lost';

export interface Pet {
    id: string;
    name: string;
    breed: string;
    age: number; // in years
    photoUrl: string;
    status: PetStatus;
    location: Location;
    ownerId: string;
}
