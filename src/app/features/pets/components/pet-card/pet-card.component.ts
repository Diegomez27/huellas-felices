import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pet } from '../../../../core/models/pet.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
    selector: 'app-pet-card',
    standalone: true,
    imports: [CommonModule, CardComponent, NgOptimizedImage],
    template: `
    <app-card class="block h-full">
      <div class="flex items-center gap-4">
        <!-- Photo -->
        <div class="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
          <img [ngSrc]="pet().photoUrl" [alt]="pet().name" fill class="object-cover" priority>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-gray-900 truncate">{{ pet().name }}</h3>
          <p class="text-sm text-gray-500 truncate">{{ pet().breed }}</p>
          
          <!-- Status Badge -->
          <div class="mt-1 flex items-center gap-1">
            <span class="relative flex h-2.5 w-2.5">
              @if (pet().status === 'alert' || pet().status === 'lost') {
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
                  [class.bg-red-400]="pet().status === 'lost'"
                  [class.bg-orange-400]="pet().status === 'alert'"></span>
              }
              <span class="relative inline-flex rounded-full h-2.5 w-2.5" 
                [class.bg-teal-500]="pet().status === 'safe'"
                [class.bg-orange-500]="pet().status === 'alert'"
                [class.bg-red-500]="pet().status === 'lost'"></span>
            </span>
            <span class="text-xs font-medium capitalize"
              [class.text-teal-600]="pet().status === 'safe'"
              [class.text-orange-600]="pet().status === 'alert'"
              [class.text-red-600]="pet().status === 'lost'">
              {{ pet().status }}
            </span>
          </div>
        </div>

        <!-- Action -->
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </app-card>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetCardComponent {
    pet = input.required<Pet>();
}
