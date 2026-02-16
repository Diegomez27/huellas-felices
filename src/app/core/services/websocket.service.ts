import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(environment.apiUrl);
    }

    joinPetRoom(petId: string) {
        this.socket.emit('joinPetRoom', { petId });
    }

    // Listen for location updates
    getLocationUpdates(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('locationUpdate', (data) => {
                observer.next(data);
            });

            // Cleanup on unsubscribe
            return () => {
                this.socket.off('locationUpdate');
            };
        });
    }

    // Simulate sending location update (for testing purposes mainly, as devices do this)
    updateLocation(petId: string, lat: number, lng: number) {
        this.socket.emit('updateLocation', {
            petId,
            userId: 'current-user-id', // Ideally get from auth service
            lat,
            lng
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
