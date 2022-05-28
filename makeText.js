/** Command-line tool to generate Markov text. */

const fs = require("fs")
const markov = require("./markov")
const axios = require("axios")

const makeMarkovMachine = (text) => {
    newMarkov = new markov.MarkovMachine(text)
    console.log(newMarkov.makeText())
}

const cat = (input) => {
    fs.readFile(input, 'utf8', (err, data) => {
        if (err) {
            console.log('There is an error', err)
            process.exit(1)
        }
        else {
            makeMarkovMachine(data)
        }
    })
}

const webCat = async (input) => {
    try {
        const res = await axios.get(input)
        makeMarkovMachine(res.data)
    }
    catch (error) {
        console.error(error)
        process.exit(1)
    }
}

let type = process.argv[2]
let input = process.argv[3]
if (type === 'file') {
    cat(input)
}
else if (type === 'url') {
    webCat(input)
}
else {
    console.log('Please specify the input type as a file or url.')
}