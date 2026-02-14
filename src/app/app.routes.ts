import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Huellas Felices - Login'
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '', // Dashboard is default for authenticated users
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: 'Huellas Felices - Dashboard'
            },
            {
                path: 'pets',
                loadComponent: () => import('./features/pets/pet-list/pet-list.component').then(m => m.PetListComponent),
                title: 'Huellas Felices - My Pets'
            },
            {
                path: 'pets/:id',
                loadComponent: () => import('./features/pets/pet-detail/pet-detail.component').then(m => m.PetDetailComponent),
                title: 'Huellas Felices - Pet Details'
            },
            {
                path: 'map',
                loadComponent: () => import('./features/map/map.component').then(m => m.MapComponent),
                title: 'Huellas Felices - Map'
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
                title: 'Huellas Felices - Profile'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
