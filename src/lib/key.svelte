<script lang="ts">
  import type { Guess } from "./types";
  export let key: string;
  export let guess: Guess;

  function getColor(guess: Guess) {
    switch (guess) {
      case "EMPTY":
        return "bg-gray-200";
      case "CORRECT":
        return "bg-green-300";
      case "NOT IN ANY SPOT":
        return "bg-gray-400";
      case "WRONG SPOT":
        return "bg-yellow-200";
      default:
        const _exhaustiveCheck: never = guess;
        return _exhaustiveCheck;
    }
  }
  $: color = getColor(guess);
  let commonClass =
    "rounded text-sm font-bold flex justify-center items-center";
</script>

{#if key === "ENTER"}
  <button on:click class="w-14 h-14 {commonClass} {color}">
    {key}
  </button>
{:else if key === "BACKSPACE"}
  <button on:click class="w-14 h-14 {commonClass} {color}">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
      />
    </svg>
  </button>
{:else}
  <button on:click class="w-7 sm:w-10 h-14 {commonClass} {color}">
    {key}
  </button>
{/if}
