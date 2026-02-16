import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
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
export class PetListComponent implements OnInit {
  petService = inject(PetService);

  ngOnInit(): void {
    this.petService.loadPets();
  }
}
