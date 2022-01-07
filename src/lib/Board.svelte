<script lang="ts">
  import Cell from "./Cell.svelte";
  import type {Guess} from "./types";
  import { previousGuesses, currentGuess } from "./stores";

  let cells :({letter: string, guess: Guess})[] = [];
  $: {
    let count = 0;
    $previousGuesses.forEach(guess => {
      guess.forEach(({letter, guess}) => {
        cells[count] = {letter, guess}
        count++
      });
    });
    $currentGuess.split("").forEach(letter => {
      cells[count] = {letter, guess:"EMPTY"};
      count++
    })

    for (let i = count; i < 25; i++) {
      cells[i] = {letter:"", guess:"EMPTY"}
    }
  }
</script>

<div class="flex justify-center py-8">
  <div class="mx-auto grid grid-rows-5 grid-cols-5 gap-2 place-content-center">
    {#each cells as {letter, guess}}
      <Cell {letter} {guess} />
    {/each}
  </div>
</div>
