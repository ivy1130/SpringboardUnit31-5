/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
    // one master chain obj, key = word, value = array of words following it

        let uniqueWords = new Set(this.words)
        this.uniqueWords = Array.from(uniqueWords)

        const chains = this.uniqueWords.reduce((ac,a) => ({...ac,[a]:[]}),{})

        for (let i = 0; i < this.words.length; i += 1) {
            let word = this.words[i]
            let nextWord = this.words[i + 1] || null
            if (chains[word].indexOf(nextWord) === -1) {
                chains[word].push(nextWord)
            }
        }

        this.chains = chains
    }

    /** return random text from chains */

    getRandomWord(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    makeText(numWords = 100) {
        let firstWord = this.getRandomWord(this.uniqueWords)
        let textArr = []
        textArr.push(firstWord)
        let stillValid = true

        while (textArr.length < numWords && stillValid == true) {
            let lastWord = textArr.at(-1)
            let nextWord = this.getRandomWord(this.chains[lastWord])
            if (nextWord !== null) {
                textArr.push(nextWord)
            }
            else {
                stillValid = false
            }
        }
        return textArr.join(" ");
    }

}

module.exports = {
    MarkovMachine,
  };