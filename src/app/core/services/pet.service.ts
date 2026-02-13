import { Injectable, signal } from '@angular/core';
import { Pet } from '../models/pet.model';

@Injectable({
    providedIn: 'root'
})
export class PetService {
    // Mock Data
    private _pets = signal<Pet[]>([
        {
            id: '1',
            name: 'Max',
            breed: 'Golden Retriever',
            age: 3,
            photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80',
            status: 'safe',
            location: { lat: 0, lng: 0, lastUpdated: new Date() },
            ownerId: 'u1'
        },
        {
            id: '2',
            name: 'Luna',
            breed: 'Siberian Husky',
            age: 2,
            photoUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=150&q=80',
            status: 'alert',
            location: { lat: 0, lng: 0, lastUpdated: new Date() },
            ownerId: 'u1'
        }
    ]);

    pets = this._pets.asReadonly();

    addPet(pet: Pet) {
        this._pets.update(pets => [...pets, pet]);
    }
}
