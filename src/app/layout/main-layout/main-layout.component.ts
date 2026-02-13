import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, BottomNavComponent],
    template: `
    <div class="min-h-screen flex flex-col bg-amber-50/30">
      <app-header />
      
      <main class="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6 max-w-5xl">
        <router-outlet />
      </main>

      <app-bottom-nav />
    </div>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent { }
