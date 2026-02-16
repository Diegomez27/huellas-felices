import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PetService } from '../../../core/services/pet.service';
import Swal from 'sweetalert2';
import { Pet } from '../../../core/models/pet.model';

@Component({
    selector: 'app-pet-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './pet-form.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private petService = inject(PetService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isLoading = signal(false);
    isEditMode = signal(false);
    petId = signal<string | null>(null);

    petForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        breed: ['', [Validators.required]],
        age: [0, [Validators.required, Validators.min(0)]],
        photoUrl: ['', [Validators.required]], // Ideally URL validator
        status: ['safe', [Validators.required]]
    });

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode.set(true);
            this.petId.set(id);
            this.isLoading.set(true);
            const pet = await this.petService.getPet(id);
            this.isLoading.set(false);

            if (pet) {
                this.petForm.patchValue({
                    name: pet.name,
                    breed: pet.breed,
                    age: pet.age,
                    photoUrl: pet.photoUrl,
                    status: pet.status
                });
            } else {
                Swal.fire('Error', 'Mascota no encontrada', 'error');
                this.router.navigate(['/pets']);
            }
        }
    }

    async onSubmit() {
        if (this.petForm.invalid) {
            this.petForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        const petData = this.petForm.value;

        try {
            let success: boolean;
            if (this.isEditMode() && this.petId()) {
                success = await this.petService.updatePet(this.petId()!, petData);
            } else {
                success = await this.petService.addPet(petData);
            }

            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: this.isEditMode() ? 'Mascota actualizada' : 'Mascota creada',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(['/pets']);
            } else {
                Swal.fire('Error', 'No se pudo guardar la mascota', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Ocurrió un error inesperado', 'error');
        } finally {
            this.isLoading.set(false);
        }
    }

    get f() { return this.petForm.controls; }
}
