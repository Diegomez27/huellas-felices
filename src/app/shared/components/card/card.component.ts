import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      @if (title()) {
        <div class="px-4 py-3 border-b border-amber-50 bg-amber-50/50 flex justify-between items-center">
          <h3 class="font-semibold text-gray-800">{{ title() }}</h3>
          <ng-content select="[header-actions]"></ng-content>
        </div>
      }
      <div class="p-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    title = input<string>();
}
