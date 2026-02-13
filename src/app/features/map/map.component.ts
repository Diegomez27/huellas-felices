import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-map',
    standalone: true,
    template: `
    <div class="h-[calc(100vh-8rem)] w-full bg-gray-100 relative">
      <div class="absolute inset-0 flex items-center justify-center">
        <p class="text-gray-500 font-medium">Map View (Placeholder)</p>
      </div>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent { }
