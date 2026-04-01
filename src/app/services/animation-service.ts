import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {

  private trigger = new Subject<void>();
  trigger$ = this.trigger.asObservable();

  disparar() {
    this.trigger.next();
  }
  
}
