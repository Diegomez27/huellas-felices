import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    email = '';
    password = '';
    isLoading = signal(false);

    async onSubmit() {
        if (!this.email || !this.password) return;

        this.isLoading.set(true);
        try {
            const success = await this.authService.login(this.email, this.password);
            if (success) {
                this.router.navigate(['/']); // Go to dashboard
            } else {
                alert('Credenciales inválidas (Intenta con cualquier email/pass no vacíos)');
            }
        } catch (error) {
            console.error('Login error', error);
        } finally {
            this.isLoading.set(false);
        }
    }
}
