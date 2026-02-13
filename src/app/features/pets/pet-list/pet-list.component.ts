import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetService } from '../../../core/services/pet.service';
import { PetCardComponent } from '../components/pet-card/pet-card.component';

@Component({
    selector: 'app-pet-list',
    standalone: true,
    imports: [CommonModule, PetCardComponent, RouterLink],
    template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Mis Mascotas</h1>
        <button class="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Nuevo
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for (pet of petService.pets(); track pet.id) {
          <a [routerLink]="['/pets', pet.id]" class="block transition-transform hover:-translate-y-1">
            <app-pet-card [pet]="pet" />
          </a>
        }
      </div>
    </div>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetListComponent {
    petService = inject(PetService);
}
