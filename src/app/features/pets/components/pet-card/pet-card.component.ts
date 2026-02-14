import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pet } from '../../../../core/models/pet.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule, CardComponent, NgOptimizedImage],
  templateUrl: './pet-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetCardComponent {
  pet = input.required<Pet>();
}
