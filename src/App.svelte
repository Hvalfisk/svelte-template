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

<template lang="pug">
  h2 Count to 100
  div.some-class.bg-yellow-300
    div {$counter$}
</template>

<style lang="postcss" global windi:global windi:preflights:global windi:safelist:global>
  .some-class {
    transition: {
      property: opacity, border-width;
      duration: 5s, 2s;
    }
    &:hover {
      opacity: 0;
      border-width: 50px;
    }
    size: 500px 200px;
    border: {
      style: solid;
      width: 10px;
      left-color: green;
      right-color: magenta;
    }
    div {
      color: red;
    }
  }
</style>
