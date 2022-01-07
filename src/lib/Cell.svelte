<script lang="ts">
    import type { Guess } from "./types";
    export let letter: string = "";
    export let guess: Guess;

    $: border = letter
        ? "border-2 border-gray-500"
        : "border-2 border-gray-300";
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
</script>

<div
    class="w-14 h-14 text-2xl font-bold flex justify-center items-center {border} {color}"
>
    {letter}
</div>
