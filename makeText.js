/** Command-line tool to generate Markov text. */

// import markov module, axios for requests
// fs and require
const markov = require('./markov');
const axios = require('axios');
const process = require('process') // 
const fs = require('fs') // file system module to work with file system

// function to instantiate using markov
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}


/** read file and generate text from it. */

function makeText(path) {
    // use fs to read file path
    fs.readFile(path, "utf8", function(err, data) {
        if (err) {
            // if there is an error reading display error msg
            console.error(`Failed attempt to read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            // if sucess, generate 
            generateText(data);
        }
    });

}


/** read URL and make text from it. */


async function makeURLText(url) {
    let resp;

    try {
        // get data from url with axios
        resp = await axios.get(url);
    } catch (err) {
        // if there is an error reading display error msg
        console.error(`Unable to read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
}


/** interpret cmdline to decide what to do. */

// get command line args after first 2 args
// node script.js *method* *path*
let [method, path] = process.argv.slice(2);
// if method is file use makeText
if (method === "file") {
    makeText(path);
}
// if method is url use make URL text
else if (method === "url") {
    makeURLText(path);
}
// otherwise display an aerror
else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}