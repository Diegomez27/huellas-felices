import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
    <div class="p-4 space-y-4">
      <h1 class="text-2xl font-bold text-gray-800">My Profile</h1>
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <p class="text-gray-600">User settings and info.</p>
      </div>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent { }
