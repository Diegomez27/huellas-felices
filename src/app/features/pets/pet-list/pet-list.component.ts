import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetService } from '../../../core/services/pet.service';
import { PetCardComponent } from '../components/pet-card/pet-card.component';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, PetCardComponent, RouterLink],
  templateUrl: './pet-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetListComponent {
  petService = inject(PetService);
}
