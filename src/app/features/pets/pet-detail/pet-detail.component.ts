import { Component, ChangeDetectionStrategy, inject, signal, effect, input, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetService } from '../../../core/services/pet.service';
import { Pet } from '../../../core/models/pet.model';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './pet-detail.component.html',
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
