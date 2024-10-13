import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { StateService } from './state.service';

@Component({
  selector: 'states-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
})
export class ServiceComponent {
  constructor(private stateService: StateService) {}

  darkTheme(): Observable<boolean> {
    return this.stateService.darkTheme$;
  }

  toggleTheme($event: Event): void {
    $event.stopPropagation();
    this.stateService.toggleTheme();
  }
}
