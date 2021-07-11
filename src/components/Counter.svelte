<script lang="ts">
  import {
    fromEvent,
    interval,
    map,
    merge,
    Observable,
    scan,
    startWith,
    takeWhile,
    withLatestFrom,
  } from "rxjs";

  const direction$: Observable<number> = merge(
    interval(3000).pipe(
      map(() => (Math.random() > 0.7 ? 1 : -1)),
      startWith(1)
    ),
    fromEvent(document, "click").pipe(map(() => 1))
  );
  const counter$: Observable<number> = interval(100).pipe(
    startWith(0),
    withLatestFrom(direction$, (_, d) => d),
    scan((acc, d) => Math.max(0, acc + d), 0),
    takeWhile((i) => i <= 100)
  );
</script>

<template lang="pug">
  div.some-class.bg-yellow-300
    div {$counter$}
</template>

<style lang="postcss">
  $animation-time: 1s;
  .some-class {
    transition: {
      property: opacity, border-width;
      duration: $animation-time, $animation-time;
      delay: 0s, $animation-time;
      timing-function: linear;
    }
    &:hover {
      opacity: 0;
      border-width: 50px;

      transition: {
        duration: $animation-time, $animation-time;
        delay: $animation-time, 0s;
      }
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
