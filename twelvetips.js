// This was from
// https://javascript.plainenglish.io/12-useful-javascript-interview-tips-c85288284595

// 1. Sets
const set1 = new Set();
const set2 = new Set(["a", "b", "c", "d", "e"]);

console.log("set2: ", set2)

set2.add("f");
set2.add("g").add("h");


console.log("set2: ", set2)


console.log("Does set2 have a? ", set2.has("a"))
console.log("Does set2 have z? ", set2.has("z"))
console.log("set2 size: ", set2.size)

set2.clear()
console.log("set2: ", set2)

// using sets to remove dupes form an array
const numbers = [1,2,3,4,4,3,2,1]
const unique_numbers = [...new Set(numbers)];
console.log("unique_numbers: ", unique_numbers)


// 2. callback

const btn_add = document.getElementById('btnAdd');
console.log("btn_add: ", btn_add)

btn_add.addEventListener('click', function clickCallback(e) {
    // do something here
    console.log("== clickCallback() ==: ")
});

// 3. ES5/ES6 modules

// 
// NOTE: A web-page opened via the file:// protocol cannot
// use import / export
//
// https://www.w3schools.com/js/js_modules.asp
//

// https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file


// Importing a single function from another file ES5 (commonJS)
// This is the form used by Note.js
//const HelpersES5 = require('./helpersES5.js');
//console.log(HelpersES5.isNull(null));


// Importing a single function from another file ES6
// This did not work for me.
//import HelpersES6 from './helpersES6.js'
//console.log(HelpersES6.isNull(null));

//import { isNull } from './helperES6.js'
//import  { isNull }  from "./helpersES6.mjs"
//import  jfdIsNull from "./helpersES6.mjs"
//import  jfdIsNull from './helpersES6.mjs'
//console.log(jfdIsNull.isNull(numbers));


// 4. Promise

// promise has three states
//
// * pending
// * fulfilled
// * rejected
//
// When the operation is successfully completed, it triggers the 
// 'then' method.
// When the operation fails, it triggers the 'catch' method


//promReadFile('data.txt')
//    .then(data => {
//        return promReaddir('directory');
//    })
//    .then(data => {
//        return promMkdir('directory');
//    })
//    .catch(e => {
//        console.log(e)
//    })

const myFirstPromise = new Promise( (resolve, reject) => {
    setTimeout(function() {
        resolve("Success!");
    }, 3000);
});

myFirstPromise.then( (data) => {
    console.log("Yay! " + data);
}).catch((e) => {
    console.log("an error occurred.")
});

// 5. async/await

// New method for asynchronous code. Its built on top of promises
// and is simpler to read.


// promise
function callApi() {
    return fetch("http://postman-echo.com/get")
        .then(resp => resp.json())
        .then(data => {
            console.log("data: ", data)
            // do something with "data"
        }).catch(err => {
            // do something with "err"
            console.log("err: ", err)
        });
}

callApi()

// sadly, this fails due to cors when using file://...../twelvetips.html
// As a result, I attempted to start a python webserver on osx via:
//
// 1. open a terminal, change directories to this dir.
// 2. start a simple python webserver 
//    $ python3 -m http.server
// 3. open browser to http://localhost:8000/twelvetips.html
// 4. open javascript console in safari via menu: Develope->Show Javascript Console.
//
// That had the same error, so I attempted to use chrome.
//
// same thing as above, but no webserver.
// 1. open terminal
// 2. start chrome
// 3. /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
// 4. open browser to file:///Users/davis/progs/gitlab/javascript/twelvetips.html
//
// same result on the postman echo api, callApi() 
// 8-(
//
// revisit this again after I read the cors article in section 4.


// async equivalent
async function callApiAsync() {
    try {
        const resp = await fetch("http://postman-echo.com/get")
        const data = await resp.json();

        // do something with "data"
        console.log("data: ", data)
    } catch(e) {
        // do something with "err"
        console.log("e: ", e)
    }
}

callApiAsync()

// Using the 'async' keyword to declare a function implicitly
// returns a promise.


// This defines an async anonymouse function 
// which takes no parms and returns 1
const giveMeOne = async () => 1;
// Call the function and log result when complete.
// This also uses an anonomous function for 
// the then clause.
giveMeOne()
    .then((num) => {
        console.log("num: ", num); // logs 1
    });
// await keyword waits for the right hand expression
// which can be a promise to return before executing
// the next line of code

console.log("getOne experiment"); 
async function getOne() {
    try {
        const num2 = await giveMeOne();
        console.log("num2: ", num2); 
    } catch (e) {
        // do something with "err"
        console.log("e: ", e)
    }
}

getOne();





async function getTwo() {
    try {
        const numA = await giveMeOne();
        const numB = await giveMeOne();
        console.log("numA: ", numA); 
        console.log("numB: ", numB); 
        return numA + numB
    } catch (e) {
        // do something with "err"
        console.log("e: ", e)
    }
}

// This is odd. in the console it will
// say getTwo() promise(pending)
// however when you click on the message
// to expand it, it will say promise state
// is fullfilled and show the promise result as
// 2.  Yet, you will never get the result 
console.log("getTwo(): ", getTwo());

// Uncaught SyntaxError: await is only valid in async function
//const result = await getTwo();

// this has same result as using the console log
const result = getTwo().then();
console.log("result: ", result);

// lol, same things as before
async function resolve() {
    const result = await getTwo()
    return result
}
console.log("result2: ", resolve());




// 6. spread operator

// The spread operator ..., converts an
// array into a comma seprated sequence of arguments.
//
// The rest operator ..., also three dots
// but its used for destructing arrays and objects.

// While the spread operator spreads an array into multiple
// elements, the rest operator collects
// multiple elements and compresses them into a single element.


// Demo spread operator
function add(a,b) {
    return a + b
}

const nums = [5,6]
const sum = add(...nums)
console.log("sum: ", sum)

// Demo rest operator
function addRest(...rest) {
    // This looks like a map/reduce operation
    // used with a anonymous function which takes
    // two parameters.  How will this work with four
    // parameters?
    return rest.reduce( (total, current) => total + current);
}

const twoParms = addRest(1,2);
console.log("twoParms: ", twoParms)

const fourParms = addRest(1,2,3,4)
console.log("fourParms: ", fourParms)

// further weirdness.  Using the rest operator
// to assign variables
const [first, ...others] = [1,2,3,4,5]
console.log("first: ", first)
console.log("others: ", others)


// 7. Default parameters

// New way to define defaults available in ES6 or ECMAScript 2015

// ES5 Version (nodejs?)
function addES5(a,b) {
    a = a || 0
    b = b || 0
    return a + b
}
console.log("addES5(1): ", addES5(1))


// ES6 Version 
function addES6(a = 0, b = 0) {
    return a + b
}
console.log("addES6(1): ", addES6(1))

// Destructuring default parameters
function getFirst([first, ...rest] = [0,1]) {
    return first
}


console.log("getFirst(): ", getFirst()) // returns 0 via default
console.log("getFirst([1]): ", getFirst([1])) // returns 1 via parms
console.log("getFirst([1,2,3]): ", getFirst([1,2,3])) // returns 1 via parms

// Also destructuring default parameters
function getArr( {nums} = { nums: [1,2,3,4] } ) {
    return nums
}

// odd, this syntax seems to require {nums: in the parms
console.log("getArr(): ", getArr()) // returns 0 via default
console.log("getArr({nums:[1]}): ", getArr({nums:[1]})) // returns 1 via parms
console.log("getArr({nums:[1,2,3]}): ", getArr({nums:[1,2,3]})) // returns 1 via parms

// Using previously defined parms before defining subsquent params

function doSomethingWithValue( value = "hello world", callback = () => { console.log(value) }) {
    callback()
}
doSomethingWithValue()


// 8. wrapper object

// Primitive Types
//
// undefined
// Null
// Boolean
// Number
// String
// Symbol
// BigInt

// Reference Types (Objects)
// These have methods and properties
//
// Object
// Array
// Date
// RegExp, etc.




let name = "Davis"

console.log("typeof name: ", typeof name)
console.log("name.toUpperCase(): ", name.toUpperCase())

// strings don't have properties or methods, but in 
// this case, its coerced into an object.  In fact,
// every primitive type, except for Null and undefined,
// has its own wrapper object.  
//
// Behind the scenes it looks like this:


console.log("new String(name).toUpperCase() : ", new String(name).toUpperCase() )


// 9. Implicit and explicit type conversion

// implicit
console.log(1 + '6')  // string 16
console.log( false + true) // number 1
console.log(6 * '2') // number 12

// explicit
console.log(1 + parseInt('6') )  // number 7


// 10. NaN

let a;

console.log("parseInt('abc'): ", parseInt('abc'))
console.log("parseInt(null): ", parseInt(null))
console.log("parseInt(undefined): ", parseInt(undefined))
console.log("parseInt(++a): ", parseInt(++a))
console.log("parseInt({} * 10): ", parseInt({} * 10))
console.log("parseInt('abc' - 2): ", parseInt('abc' - 2))
console.log("parseInt(0/0): ", parseInt(0/0))
console.log("parseInt('10a' * 10): ", parseInt('10a' * 10))

// isNaN
console.log("isNaN(): ", isNaN())
console.log("isNaN(undefined): ", isNaN(undefined))
console.log("isNaN({}): ", isNaN({}))
console.log("isNaN(String('abc')): ", isNaN(String('abc')))
console.log("isNaN(0/0): ", isNaN(0/0))
console.log("isNaN(() => {} ): ", isNaN(() => {} ))

// IS6 its recommended to use the Number.isNaN
// Alternatively, can do this since NaN is only 
// value that is not equal to itself

function checkIfNaN(value) {
    return value !== value;
}
console.log("checkIfNaN(): ", checkIfNaN())
console.log("checkIfNaN(undefined): ", checkIfNaN(undefined))
console.log("checkIfNaN(0/0): ", checkIfNaN(0/0))
console.log("checkIfNaN(1/0): ", checkIfNaN(1/0))
console.log("(0/0): ", (0/0))
console.log("(1/0): ", (1/0))

// 11. Determine if array

// Use Array.isArray method 

console.log("Array.isArray(5): ",Array.isArray(5))
console.log("Array.isArray(\"\"): ",Array.isArray(""))
console.log("Array.isArray(): ",Array.isArray())
console.log("Array.isArray(null): ",Array.isArray(null))
console.log("Array.isArray({ length: 5} ): ",Array.isArray({ length: 5} ))
console.log("Array.isArray([]): ",Array.isArray([]))

// If environment does not support Array.isArray use this method
function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]"
}

console.log("isArray([]): ", isArray([]))

// or use traditional methods
let z = []
if (z instanceof Array) {
    console.log('z is an array')
} else {
    console.log('z is not an array')
}

// 12. Does property exist?

// Method 1
// using in operator

const o = {
    "prop" : "rabbit",
    "prop2" : "tiger"
}

console.log("prop in o", "prop" in o)
console.log("prop1 in o", "prop1" in o)

// Method 2
// using hasOwnProperty method.

console.log("o.hasOwnProperty(\"prop2\")", o.hasOwnProperty("prop2"))
console.log("o.hasOwnProperty(\"prop1\")", o.hasOwnProperty("prop1"))


// Method 3
// using bracket notation. If it exists,
// it will return the property value, otherwise undefined

console.log("o[\"prop2\"]", o["prop2"])
console.log("o[\"prop1\"]", o["prop1"])


