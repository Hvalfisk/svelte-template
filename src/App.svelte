<script lang="ts">
  import { interval, Observable, scan, startWith, takeWhile, withLatestFrom } from 'rxjs';
  import { map } from 'rxjs/operators';

  const direction$: Observable<1 | -1> = interval(1000).pipe(map(() => Math.random() > 0.3 ? 1 : -1), startWith(1));
  const counter$: Observable<number> =
    interval(1000)
      .pipe(
        startWith(0),
        withLatestFrom(direction$, (_, d) => d),
        scan((acc, d) => acc + d, 0),
        takeWhile(i => i <= 10)
      );
</script>

<h2>Count to 10</h2>

{$counter$}
