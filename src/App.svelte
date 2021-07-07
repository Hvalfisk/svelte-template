<script lang="ts">
  import { fromEvent, interval, map, merge, Observable, scan, startWith, takeWhile, withLatestFrom } from 'rxjs';

  const direction$: Observable<1 | -1> =
    merge(
      interval(3000)
        .pipe(
          map(() => Math.random() > 0.7 ? 1 : -1),
          startWith(1)
        ),
      fromEvent(document, 'click').pipe(map(() => 1))
    );
  const counter$: Observable<number> =
    interval(100)
      .pipe(
        startWith(0),
        withLatestFrom(direction$, (_, d) => d),
        scan((acc, d) => Math.max(0, acc + d), 0),
        takeWhile(i => i <= 100)
      );
</script>

<h2 class="xl:bg-green-400">Count to 100</h2>
<p>{$counter$}</p>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
