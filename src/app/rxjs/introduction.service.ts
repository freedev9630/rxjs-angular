import { Injectable } from '@angular/core';
import { Observable, Observer, Subject, Subscription } from 'rxjs';

const observer: Observer<string> = {
  next: (val) => console.log(val),
  error: (err) => console.warn(err),
  complete: () => console.log('Completado'),
};

@Injectable({
  providedIn: 'root',
})
export class IntroductionService {
  private sub!: Subscription;
  constructor() {}

  start() {
    this.observable();
  }

  stop() {
    this.sub?.unsubscribe();
  }

  observable() {
    const obs = new Observable<string>((sub) => {
      const interval = setInterval(() => {
        const uuid = crypto.randomUUID();
        sub.next(uuid);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    });

    const subject = new Subject<string>();

    this.sub = obs.subscribe(subject);

    subject.subscribe(observer);
  }
}
