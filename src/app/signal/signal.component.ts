import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'states-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalComponent {
  darkTheme: WritableSignal<boolean> = signal(true);

  toggleTheme($event: Event): void {
    $event.stopPropagation();
    this.darkTheme.update((currentValue: boolean) => !currentValue);
  }
}
