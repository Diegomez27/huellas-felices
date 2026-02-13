import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CardComponent, RouterLink],
    template: `
    <div class="space-y-6">
      
      <!-- Welcome Section -->
      <section class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Hola, Diego 👋</h1>
          <p class="text-gray-500 text-sm">Todo se ve bien hoy.</p>
        </div>
        <a routerLink="/profile" class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <span class="font-bold">D</span>
        </a>
      </section>

      <!-- Stats Grid -->
      <section class="grid grid-cols-2 gap-4">
        <app-card class="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-amber-200">
          <div class="flex flex-col items-center py-2">
            <span class="text-3xl font-bold text-white">3</span>
            <span class="text-amber-100 text-xs mt-1">Mascotas</span>
          </div>
        </app-card>
        
        <app-card class="bg-white text-gray-800 border-teal-100">
           <div class="flex flex-col items-center py-2 text-teal-600">
            <span class="text-3xl font-bold">Safe</span>
            <span class="text-gray-400 text-xs mt-1">Estado</span>
          </div>
        </app-card>
      </section>

      <!-- Recent Alerts -->
      <section>
        <h2 class="text-lg font-bold text-gray-800 mb-3">Actividad Reciente</h2>
        <app-card>
          <ul class="divide-y divide-gray-100">
            @for (activity of activities(); track activity.id) {
              <li class="py-3 flex items-center gap-3">
                <div [class]="'w-2 h-2 rounded-full ' + activity.color"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">{{ activity.title }}</p>
                  <p class="text-xs text-gray-400">{{ activity.time }}</p>
                </div>
              </li>
            }
          </ul>
        </app-card>
      </section>

      <!-- Quick Actions -->
      <section class="grid grid-cols-2 gap-4">
        <button class="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50">
          <div class="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700">Rastrear</span>
        </button>
        
         <button class="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50">
          <div class="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-700">Reportar</span>
        </button>
      </section>

    </div>
  `,
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    activities = signal([
        { id: 1, title: 'Max salió de la zona segura', time: 'Hace 2 min', color: 'bg-red-500' },
        { id: 2, title: 'Luna completó su paseo', time: 'Hace 1 hora', color: 'bg-teal-500' },
        { id: 3, title: 'Batería baja en collar de Rocky', time: 'Hace 3 horas', color: 'bg-amber-500' }
    ]);
}
