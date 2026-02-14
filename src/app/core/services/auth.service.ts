import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string; // Backend might not send this initially, so optional
    phone?: string;
}

interface authResponse {
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = environment.apiUrl + '/auth';

    // Signal to hold the current user state
    private _currentUser = signal<User | null>(this.getUserFromStorage());
    private _token = signal<string | null>(this.getTokenFromStorage());

    currentUser = this._currentUser.asReadonly();
    isAuthenticated = computed(() => !!this._token());

    constructor() {
        // Effect to sync token with local storage (optional, but good for reactivity)
        effect(() => {
            const token = this._token();
            if (token) {
                localStorage.setItem('auth_token', token);
            } else {
                localStorage.removeItem('auth_token');
            }
        });
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await firstValueFrom(this.http.post<authResponse>(`${this.apiUrl}/login`, { email, password }));
            if (response.access_token) {
                this._token.set(response.access_token);
                await this.getProfile(); // Fetch user details
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    }

    async register(userData: any): Promise<boolean> {
        try {
            await firstValueFrom(this.http.post(`${this.apiUrl}/register`, userData));
            // Automatically login after register or redirect to login? 
            // For now, let's assume we redirect to login, or we can auto-login if the backend returns a token on register
            return true;
        } catch (error) {
            console.error('Registration failed', error);
            return false;
        }
    }

    async getProfile() {
        if (!this._token()) return;

        try {
            // We need to manually add the header here OR use an interceptor. 
            // Since we haven't built the interceptor yet, let's add it manually for this call to work immediately, 
            // but the plan says to build an interceptor. I will stick to the plan and create the interceptor next.
            // However, to make this service independently testable without interceptor for a second, I'll rely on the interceptor being present.
            // Wait, if I don't have the interceptor yet, this call will fail 401. 
            // I'll assume the interceptor is coming right up.
            const user = await firstValueFrom(this.http.get<User>(`${this.apiUrl}/me`));
            this._currentUser.set(user);
            this.saveUserToStorage(user);
        } catch (error) {
            console.error('Failed to fetch profile', error);
            this.logout();
        }
    }

    logout() {
        this._currentUser.set(null);
        this._token.set(null);
        localStorage.removeItem('user_session');
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return this._token();
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

    private getTokenFromStorage(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    }
}
