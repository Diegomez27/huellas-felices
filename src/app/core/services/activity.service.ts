import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface Activity {
    id?: string;
    petId: string;
    type: 'walk' | 'rest' | 'play';
    duration: number; // minutes
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ActivityService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl + '/activities';

    async getPetActivities(petId: string): Promise<Activity[]> {
        try {
            return await firstValueFrom(this.http.get<Activity[]>(`${this.apiUrl}/pet/${petId}`));
        } catch (error) {
            console.error('Error loading activities', error);
            return [];
        }
    }

    async logActivity(activity: Activity): Promise<boolean> {
        try {
            await firstValueFrom(this.http.post(this.apiUrl, activity));
            return true;
        } catch (error) {
            console.error('Error logging activity', error);
            return false;
        }
    }
}
