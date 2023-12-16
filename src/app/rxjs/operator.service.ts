import { Injectable } from '@angular/core';
import { from, range } from 'rxjs';
import { filter, map, reduce, scan, tap } from 'rxjs/operators';
import data from './data/user';

@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  constructor() {
    this.scan();
  }

  scan() {
    const scanFn = (acc: number, curr: number) => acc + curr;

    const obs = range(1, 5).pipe(
      // tap((val) => console.log('tap', val)),
      scan<number, number>(scanFn, 12)
    );

    obs.subscribe((val) => console.log(val));
  }

  reduce() {
    const reduceFn = (acc: number, curr: number) => acc + curr;

    const obs = range(0).pipe(
      tap((val) => console.log('tap', val)),
      reduce<number, number>(reduceFn, 12)
    );

    obs.subscribe((val) => console.log(val));
  }

  tap() {
    const obs = from(data).pipe(
      tap((val) => console.log('antes de filter', val)),
      filter((val) => val.email === 'Rey.Padberg@karina.biz'),
      map<any, { email: string; name: string; username: string }>(
        ({ email, name, username }) => {
          return {
            email,
            name,
            username,
          };
        }
      ),
      tap((val) => console.log('después de filter', val))
    );

    obs.subscribe();
  }

  filter() {
    const obs = from(data).pipe(
      filter((val) => val.email === 'Rey.Padberg@karina.biz')
    );

    obs.subscribe((val) => console.log(val));
  }

  map() {
    const obs = from(data).pipe(
      map<any, { email: string; name: string; username: string }>(
        ({ email, name, username }) => {
          return {
            email,
            name,
            username,
          };
        }
      )
    );

    obs.subscribe((val) => console.log(val));
  }
}
