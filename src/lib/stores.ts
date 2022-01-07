import { derived, writable } from "svelte/store";
import type { Guess } from "./types"
import words from "./words"

interface State {
    currentGuess: string;
    wordToGuess: string;
    previousGuesses: string[]
}

const initialState: State = {
    currentGuess: "",
    wordToGuess: "FLASK",
    previousGuesses: []
}

function createWordSetter() {
    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        addLetter: (letter: string) =>
            update(state => {
                let currentGuess = state.currentGuess;
                if (currentGuess.length < 5) {
                    currentGuess = currentGuess + letter;
                }
                return { ...state, currentGuess }
            }),
        removeLetter: () => update(state => ({ ...state, currentGuess: state.currentGuess.slice(0, -1) })),
        enter: () => update(state => {
            if (state.currentGuess.length === 5) {
                if (words.includes(state.currentGuess.toLowerCase())) {
                    return { ...state, previousGuesses: [...state.previousGuesses, state.currentGuess], currentGuess: "" }
                }
                else {
                    return { ...state, currentGuess: "" }
                }

            } else {
                return state
            }

        }

        )
    }
}

function matchWord(guess: string, wordToGuess: string): { letter: string, guess: Guess }[] {
    return guess.split("").map((letter, i) => {
        if (wordToGuess[i] === letter) {
            return { letter, guess: "CORRECT" }
        } else if (wordToGuess.includes(letter)) {
            return { letter, guess: "WRONG SPOT" }
        } else {
            return { letter, guess: "NOT IN ANY SPOT" }
        }
    }
    )
}

export const wordSetter = createWordSetter()

export const currentGuess = derived(wordSetter, $state => $state.currentGuess)
export const previousGuesses = derived(wordSetter, $state => {
    return $state.previousGuesses.map(guessedWord => matchWord(guessedWord, $state.wordToGuess))
})

export const guessedLetters = derived(previousGuesses, $previous => {
    let r = $previous.reduce((acc, word) => word.reduce((acc, { letter, guess }) => {
        let x = acc[letter]
        if (x === "CORRET") return
        if (x === "WRONG SPOT" && guess === "CORRECT") {
            acc[letter] = "CORRECT"
        }
        acc[letter] = guess
        return acc
    }, acc), {});
    return r;
})