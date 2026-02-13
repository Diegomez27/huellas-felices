import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    template: `
    <header class="sticky top-0 z-50 w-full bg-primary text-white shadow-md">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center gap-2">
          <span class="text-xl font-bold tracking-tight">Huellas Felices</span>
        </a>

        <!-- User Actions (Placeholder) -->
        <button class="p-2 rounded-full hover:bg-primary-dark transition-colors" aria-label="User Profile">
          <div class="w-8 h-8 rounded-full bg-surface/20 flex items-center justify-center">
            <span class="text-sm font-medium">U</span>
          </div>
        </button>
      </div>
    </header>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent { }
