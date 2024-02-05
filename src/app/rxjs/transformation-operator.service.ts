import { Injectable } from '@angular/core';
import { forkJoin, fromEvent, interval, of } from 'rxjs';
import { catchError, concatMap, endWith, exhaustMap, map, mergeAll, mergeMap, startWith, switchMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class TransformationOperatorService {

  constructor() {
    this.forkJoin();
  }


//  startWith, endWith, forkJoin


  forkJoin() {
    const request1$ = ajax.getJSON(`https://jsonplaceholder.typicode.com/todos`);
    const request2$ = ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/2`);
    const request3$ = ajax.getJSON(`https://jsonplaceholder.typicode.com/todo`).pipe(
      catchError(err => of(err))
    );

    forkJoin({todos: request1$, todo: request2$, error: request3$}).subscribe(console.log);
  }

  endAndStart() {
    const obs$ = of(1, 2, 3, 4).pipe(
      startWith('Hola'),
      endWith('Mundo')
    );

    obs$.subscribe(console.log);
  }

  exhausMap() {
    const interval$ = interval(500).pipe(
      take(4)
    );

    fromEvent(document, 'click').pipe(
      exhaustMap(() => interval$)
    ).subscribe(console.log);
  }

  concatMap() {
    const interval$ = interval(500).pipe(
      take(4)
    );

    fromEvent(document, 'click').pipe(
      concatMap(() => interval$)
    ).subscribe(console.log);
  }

  switchMapVSmergeMap() {
    const interval$ = interval(500).pipe(
      take(4)
    );

    fromEvent(document, 'click').pipe(
      switchMap(() => interval$)
    ).subscribe(console.log);
  }


  switchMap(input: HTMLInputElement) {
    const input$ = fromEvent(input, 'input').pipe(
      switchMap((val) => ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${(val.target as HTMLInputElement).value}`))
     );

    input$.subscribe(console.log);
  }


  mergeMap(input: HTMLInputElement) {
    const input$ = fromEvent(input, 'input').pipe(
       mergeMap((val) => ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${(val.target as HTMLInputElement).value}`))
     );

    input$.subscribe(console.log);
  }


  mergeAll(input: HTMLInputElement) {
    const input$ = fromEvent(input, 'input').pipe(
      map(val => ajax.getJSON(`https://jsonplaceholder.typicode.com/todos/${(val.target as HTMLInputElement).value}`)
    ),
      mergeAll()
    );

    input$.subscribe(console.log);
  }


  // mergeAll() {
  //   const interval1$ = interval(1000).pipe(
  //     take(4)
  //   );

  //   const interval2$ = interval(500).pipe(
  //     take(2)
  //   );

  //   interval1$.pipe(
  //     map((val1) => interval2$.pipe(
  //       map(val2 => 'fuent1: ' + val1 + ' ---- ' + 'Fuente2: ' + val2)
  //     )),
  //     mergeAll()
  //   ).subscribe(console.log)
  // }
}
