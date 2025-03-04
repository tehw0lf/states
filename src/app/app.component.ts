import { Component } from '@angular/core';

import { LocalStorageComponent } from './local-storage/local-storage.component';

@Component({
  standalone: true,
  imports: [LocalStorageComponent],
  selector: 'states-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    localStorage.setItem('theme', 'dark');
  }
}
