import { Component, ChangeDetectionStrategy, inject, signal, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../../core/services/pet.service';
import { ActivityService, Activity } from '../../../core/services/activity.service';
import { WebsocketService } from '../../../core/services/websocket.service';
import { Pet } from '../../../core/models/pet.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, DatePipe, FormsModule],
  templateUrl: './pet-detail.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetDetailComponent implements OnInit, OnDestroy {
  private petService = inject(PetService);
  private activityService = inject(ActivityService);
  private wsService = inject(WebsocketService);

  @Input() id?: string; // Component Input Binding matches route param :id

  pet = signal<Pet | undefined>(undefined);
  activities = signal<Activity[]>([]);
  currentLocation = signal<{ lat: number, lng: number } | null>(null);

  private locationSub?: Subscription;

  // Form State
  isAddingActivity = signal(false);
  isLoadingActivity = signal(false);
  newActivityType = signal<'walk' | 'play' | 'rest'>('walk');
  newActivityDuration = signal(30);

  async ngOnInit() {
    if (this.id) {
      await this.loadData();

      // Real-time setup
      this.wsService.joinPetRoom(this.id);
      this.locationSub = this.wsService.getLocationUpdates().subscribe(data => {
        if (data.petId === this.id) {
          this.currentLocation.set({ lat: data.lat, lng: data.lng });
          // Optionally update map marker or toast
          console.log('New location:', data);
        }
      });
    }
  }

  ngOnDestroy() {
    this.locationSub?.unsubscribe();
    this.wsService.disconnect();
  }

  async loadData() {
    if (!this.id) return;
    const pet = await this.petService.getPet(this.id);
    this.pet.set(pet);

    if (pet) {
      const acts = await this.activityService.getPetActivities(this.id);
      this.activities.set(acts);
    }
  }

  async saveActivity() {
    if (!this.id) return;

    this.isLoadingActivity.set(true);
    const activity: Activity = {
      petId: this.id,
      type: this.newActivityType(),
      duration: this.newActivityDuration(),
      timestamp: new Date()
    };

    const success = await this.activityService.logActivity(activity);
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Actividad registrada',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      this.isAddingActivity.set(false);
      await this.loadData(); // Reload to show new activity
    } else {
      Swal.fire('Error', 'No se pudo registrar la actividad', 'error');
    }
    this.isLoadingActivity.set(false);
  }
}
