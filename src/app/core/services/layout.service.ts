import { Injectable, signal, computed, inject, PLATFORM_ID, EffectRef, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    private platformId = inject(PLATFORM_ID);

    // State
    private _isMobile = signal<boolean>(false);
    private _sidebarOpen = signal<boolean>(false);

    // Read-only signals
    isMobile = this._isMobile.asReadonly();
    sidebarOpen = this._sidebarOpen.asReadonly();

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.checkScreenSize();
            window.addEventListener('resize', () => this.checkScreenSize());
        }
    }

    toggleSidebar() {
        this._sidebarOpen.update(v => !v);
    }

    closeSidebar() {
        this._sidebarOpen.set(false);
    }

    private checkScreenSize() {
        this._isMobile.set(window.innerWidth < 768);
        // Auto-close sidebar on mobile
        if (this._isMobile()) {
            this._sidebarOpen.set(false);
        }
    }
}
