import { Injectable } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { auditTime, debounceTime, distinctUntilChanged, map, sample, tap, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeOperatorService {

  constructor() {}


  auditTime(input: HTMLInputElement) {

    const input$ = fromEvent<InputEvent>(input, 'input')
    .pipe(
      map(val => (val.target as HTMLInputElement).value),
      auditTime(2000)
    );

    input$.subscribe(console.log);
  }


  sample(input: HTMLInputElement) {
    const input$ = fromEvent<InputEvent>(input, 'input');

    const interval$ = interval(1000).pipe(
      tap(val => console.log('tap', val)),
      sample(input$)
    );

    interval$.subscribe(console.log);
  }

  throtttleTime(input: HTMLInputElement) {
    const input$ = fromEvent<InputEvent>(input, 'input').pipe(
      throttleTime(2000),
      map(val => (val.target as HTMLInputElement).value),
    );

    input$.subscribe(console.log);
  }

  debounceTime(input: HTMLInputElement) {
    const input$ = fromEvent<InputEvent>(input, 'input').pipe(
      debounceTime(2000),
      map(val => (val.target as HTMLInputElement).value),
      distinctUntilChanged(),
    );

    input$.subscribe(console.log);
  }
}
