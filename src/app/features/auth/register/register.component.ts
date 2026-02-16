import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = signal(false);

    registerForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', [Validators.pattern('^[0-9]+$')]] // Optional numeric only
    });

    async onSubmit() {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        try {
            const success = await this.authService.register(this.registerForm.value);
            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Registro Exitoso!',
                    text: 'Ahora puedes iniciar sesión con tus credenciales.',
                    confirmButtonColor: '#d97706'
                }).then(() => {
                    this.router.navigate(['/login']);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: 'No se pudo completar el registro. Intenta nuevamente.',
                    confirmButtonColor: '#d97706'
                });
            }
        } catch (error) {
            console.error('Register error', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Hubo un problema al conectar con el servidor.',
                confirmButtonColor: '#d97706'
            });
        } finally {
            this.isLoading.set(false);
        }
    }

    // Heplers for template
    get f() { return this.registerForm.controls; }
}
