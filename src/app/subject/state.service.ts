import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _darkTheme: BehaviorSubject<boolean> = new BehaviorSubject(true);

  darkTheme$: Observable<boolean> = this._darkTheme.asObservable();

  toggleTheme(): void {
    this._darkTheme.next(!this._darkTheme.value);
  }
}
