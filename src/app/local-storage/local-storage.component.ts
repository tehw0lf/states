import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SignalComponent } from '../signal/signal.component';
import { ServiceComponent } from '../subject/subject.component';

@Component({
  selector: 'states-local-storage',
  standalone: true,
  imports: [SignalComponent, ServiceComponent, CommonModule],
  templateUrl: './local-storage.component.html',
  styleUrl: './local-storage.component.scss',
})
export class LocalStorageComponent {
  getTheme(): string | null {
    return localStorage.getItem('theme');
  }

  toggleTheme($event: Event): void {
    $event.stopPropagation();
    localStorage.setItem(
      'theme',
      this.getTheme() === 'dark' ? 'light' : 'dark'
    );
  }
}
