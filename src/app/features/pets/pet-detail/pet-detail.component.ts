import { Component, ChangeDetectionStrategy, inject, signal, effect, input, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetService } from '../../../core/services/pet.service';
import { Pet } from '../../../core/models/pet.model';

@Component({
    selector: 'app-pet-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, NgOptimizedImage],
    template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center gap-2">
        <a routerLink="/pets" class="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-gray-800">Detalles</h1>
      </div>

      @if (pet(); as p) {
        <!-- Profile Header -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          <div class="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-white shadow-md">
            <img [ngSrc]="p.photoUrl" [alt]="p.name" fill class="object-cover" priority>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">{{ p.name }}</h2>
          <p class="text-gray-500">{{ p.breed }} • {{ p.age }} años</p>
          
          <div class="mt-4 flex gap-2">
            <span class="px-3 py-1 rounded-full text-sm font-medium capitalize"
               [class.bg-teal-100]="p.status === 'safe'"
               [class.text-teal-700]="p.status === 'safe'"
               [class.bg-orange-100]="p.status === 'alert'"
               [class.text-orange-700]="p.status === 'alert'"
               [class.bg-red-100]="p.status === 'lost'"
               [class.text-red-700]="p.status === 'lost'">
              Estado: {{ p.status }}
            </span>
          </div>
        </div>

        <!-- Info Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <span class="text-xs text-gray-400 uppercase tracking-wide">Actividad</span>
            <p class="text-lg font-semibold text-gray-800 mt-1">Alta</p>
            <p class="text-xs text-teal-500 font-medium">+12% vs ayer</p>
          </div>
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <span class="text-xs text-gray-400 uppercase tracking-wide">Salud</span>
            <p class="text-lg font-semibold text-gray-800 mt-1">98%</p>
            <p class="text-xs text-gray-500 font-medium">Batería OK</p>
          </div>
        </div>

        <!-- Map Placeholder -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100">
             <h3 class="font-bold text-gray-800">Ubicación Actual</h3>
          </div>
          <div class="h-48 bg-gray-100 relative items-center justify-center flex">
             <span class="text-gray-400 font-medium flex gap-2 items-center">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
               </svg>
               Mapa Interactivo
             </span>
          </div>
        </div>

      } @else {
        <p class="text-center text-gray-500 mt-10">Mascota no encontrada.</p>
      }
    </div>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetDetailComponent {
    private route = inject(ActivatedRoute);
    private petService = inject(PetService);

    // Derive pet from route param
    pet = checkPet(this.route, this.petService);
}

// Helper to handle signal/observable mix nicely if needed, or just use effect
function checkPet(route: ActivatedRoute, petService: PetService) {
    const pets = petService.pets;
    // We need to capture the ID. 
    // Route params are observables. 
    // For simplicity in this mock, we'll assume we can get it or just map it.
    // But we need a Signal for the ID to make it reactive with signals.
    // Angular Router v19+ supports binding inputs to params naturally! 
    // Let's use `withComponentInputBinding` in app config (checked default, might not be on)
    // If not, we use basic route subscription or toSignal.
    // For now, let's just use a simple computed if we had the ID as signal.
    // Assuming Router Input Binding is NOT enabled by default in my quick check of app.config (I didn't see it).
    // I'll stick to a simple signal update via constructor for now or just standard RxJS -> Signal.

    // Actually, standard practice for now:
    const id = signal<string | null>(null);
    route.paramMap.subscribe(params => id.set(params.get('id')));

    return computed(() => pets().find(p => p.id === id()));
}
