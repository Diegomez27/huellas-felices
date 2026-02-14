import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  activities = signal([
    { id: 1, title: 'Max salió de la zona segura', time: 'Hace 2 min', color: 'bg-red-500' },
    { id: 2, title: 'Luna completó su paseo', time: 'Hace 1 hora', color: 'bg-teal-500' },
    { id: 3, title: 'Batería baja en collar de Rocky', time: 'Hace 3 horas', color: 'bg-amber-500' }
  ]);
}
