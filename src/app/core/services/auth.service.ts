import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private router = inject(Router);

    // Signal to hold the current user state
    // Initialized from localStorage if available (simple persistence)
    private _currentUser = signal<User | null>(this.getUserFromStorage());

    currentUser = this._currentUser.asReadonly();
    isAuthenticated = computed(() => !!this._currentUser());

    login(email: string, password: string): Promise<boolean> {
        // Mock login logic
        return new Promise((resolve) => {
            setTimeout(() => {
                if (email && password) { // Accept any non-empty credentials for now
                    const user: User = {
                        id: 'u1',
                        name: 'Diego',
                        email: email,
                        avatarUrl: 'https://ui-avatars.com/api/?name=Diego&background=fef3c7&color=d97706'
                    };
                    this._currentUser.set(user);
                    this.saveUserToStorage(user);
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000); // Simulate network delay
        });
    }

    logout() {
        this._currentUser.set(null);
        localStorage.removeItem('user_session');
        this.router.navigate(['/login']);
    }

    private saveUserToStorage(user: User) {
        localStorage.setItem('user_session', JSON.stringify(user));
    }

    private getUserFromStorage(): User | null {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('user_session');
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    }
}
