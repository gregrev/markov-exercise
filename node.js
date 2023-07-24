const { MarkovMachine } = require('./markov');


const text = "My name is Greg, Revollo and I am tall. I also live in New Jersey and I am studying software engineering.";

const markovMachine = new MarkovMachine(text);

const randomText = markovMachine.makeText(10);
console.log(randomText);