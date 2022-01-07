<script lang="ts">
  import Key from "./key.svelte"
  import {wordSetter, guessedLetters} from "./stores";
  let keyboard = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((word, i) => {
    let row = word.split('')
    if (i == 2) {
      row.unshift('ENTER')
      row.push('BACKSPACE')
    }
    return row
  })
  function handleClick(e) {
    if (e === "ENTER") {
      wordSetter.enter();
    } else if (e === "BACKSPACE") {
      wordSetter.removeLetter()
    } else {
      wordSetter.addLetter(e)
    }
  }
</script>

<div class="flex flex-col justify-center gap-2">
  {#each keyboard as row}
    <div class="flex justify-center gap-x-2">
      {#each row as key}
        <Key {key} guess={$guessedLetters[key] || "EMPTY"} on:click={() => handleClick(key)}/>
      {/each}
    </div>
  {/each}
</div>
