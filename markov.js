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
    // TODO
    // create new map to have Markov chains
    let chains = new Map()

    // iterate over the words 
    for (let i = 0; i < this.words.length; i += 1) {
      // current word
      let word = this.words[i];
      // get the next word if no next word end of array
      let next = this.words[i + 1] || null;


      // if word is in chainss push next word to its array
      if (chains.has(word)) {
        chains.get(word).push(next);
      }
      // if NOT in chains make a new key-value pair in chains
      // key value is word and next array of values that come next
      else {
        chains.set(word, [next]);
      }
      // make new map accessible in makeText
      this.chains = chains
    }
  }
  
  //  this static method takes an array and returns random element
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 70) {
    // TODO
    // ,ake and array with keys from new chains map
    let keys = Array.from(this.chains.keys());
    // choose random key word from keys with choice method
    let key = MarkovMachine.choice(keys);
    // empty array contains generated text
    let out = [];

    // produce markov chain until reaching termination word or numWords is satisfied
    while (out.length < numWords && key !== null) {
      // add current key word to out array
      out.push(key);
      // pick next word from chains thats assocuated
      key = MarkovMachine.choice(this.chains.get(key));
    }

    // return generated text in out array with spaces
    return out.join(" ");
  }
}

// export class to make accessible from other files
module.exports = {
  MarkovMachine,
};