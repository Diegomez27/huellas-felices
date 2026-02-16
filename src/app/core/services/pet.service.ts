import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PetService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl + '/pets';

    private _pets = signal<Pet[]>([]);
    pets = this._pets.asReadonly();

    constructor() {
        // Optionally load pets on initialization if authenticated, 
        // but better to let components trigger it or use an effect in a store.
        // For now, let's expose a method to load.
    }

    async loadPets() {
        try {
            const pets = await firstValueFrom(this.http.get<Pet[]>(this.apiUrl));
            this._pets.set(pets);
        } catch (error) {
            console.error('Error loading pets', error);
        }
    }

    async getPet(id: string): Promise<Pet | undefined> {
        try {
            return await firstValueFrom(this.http.get<Pet>(`${this.apiUrl}/${id}`));
        } catch (error) {
            console.error(`Error loading pet ${id}`, error);
            return undefined;
        }
    }

    async addPet(petData: Partial<Pet>): Promise<boolean> {
        try {
            const newPet = await firstValueFrom(this.http.post<Pet>(this.apiUrl, petData));
            this._pets.update(pets => [...pets, newPet]);
            return true;
        } catch (error) {
            console.error('Error adding pet', error);
            return false;
        }
    }

    async updatePet(id: string, petData: Partial<Pet>): Promise<boolean> {
        try {
            const updatedPet = await firstValueFrom(this.http.patch<Pet>(`${this.apiUrl}/${id}`, petData));
            this._pets.update(pets => pets.map(p => p.id === id ? updatedPet : p));
            return true;
        } catch (error) {
            console.error('Error updating pet', error);
            return false;
        }
    }
}
