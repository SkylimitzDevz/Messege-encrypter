const inputMsg = document.getElementById("input-field")
const outputEl = document.getElementById("output-el")
const encryptBtn = document.getElementById("enctypt-btn")
const decryptBtn = document.getElementById("decrypt-btn")
const cpyBtn = document.getElementById("cpy-btn")
const pasteBtn = document.getElementById("paste-btn")

pasteBtn.addEventListener("click", () => {
    navigator.clipboard.readText().then(text => {
        inputMsg.value = text
        pasteBtn.textContent = "Pasted!"
        setTimeout(() => {
            pasteBtn.textContent = "Paste"
        }, 700)
    })
})

const symbols = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "-", "_", "=", "+", "[", "]", "{", "}", ";", ":",
    "'", ",", ".", "<", ">", "/", "?", "|",
    "~", "`"
]

const letterSwapMap = {
    a: "s",
    b: "d",
    c: "u",
    d: "f",
    e: "q",
    f: "e",
    g: "b",
    h: "c",
    i: "z",
    j: "m",
    k: "n",
    l: "i",
    m: "p",
    n: "q",
    o: "w",
    p: "h",
    q: "j",
    r: "l",
    s: "r",
    t: "t",
    u: "m",
    v: "b",
    w: "v",
    x: "x",
    y: "o",
    z: "y",

}

const numSwapMap = {
    1: "3",
    2: "2",
    3: "7",
    4: "9",
    5: "8",
    6: "0",
    7: "1",
    8: "5",
    9: "4",
    0: "6",
}



const symbolSwapMap = {
    "!": "@",
    "@": "#",
    "#": "$",
    "$": "%",
    "%": "^",
    "^": "&",
    "&": "*",
    "*": "(",
    "(": ")",
    ")": "!",
    "-": "_",
    "_": "-",
    "=": "+",
    "+": "=",
    "[": "]",
    "]": "[",
    "{": "}",
    "}": "{",
    ";": ":",
    ":": ";",
    "'": ",",
    ",": "'",
    ".": "<",
    "<": ".",
    ">": "/",
    "/": ">",
    "?": "|",
    "|": "?",
    "~": "`",
    "`": "~"
};


const numOriginal = makeOriginalMap(numSwapMap)
const symOriginal = makeOriginalMap(symbolSwapMap)

cpyBtn.addEventListener("click", () => {
  const text = outputEl.textContent;
  navigator.clipboard.writeText(text);
  
  cpyBtn.textContent = "Copied!";
  setTimeout(() => {
    cpyBtn.textContent = "Copy";
  }, 700);
});

function getSymbol(array){
    let i = Math.floor(Math.random()*array.length)
    return array[i]
}


encryptBtn.addEventListener("click", function(){
    encrypt(inputMsg.value)
})

decryptBtn.addEventListener("click", function(){
    deCrypt(inputMsg.value)
})

// ----------- encrypter -----------

function encrypt(inputEl){
    
    inputMsg.value = ""

    let output = ""

    for (let i = 0; i < inputEl.length; i++) {
        output += `${getSymbol(symbols)}${inputEl.charCodeAt(i)}`
    }
    let numSwapped = numSwapper(output)
    let result = symbolSwapper(numSwapped)


    outputEl.textContent = result
    
}


// ----------- decrypter -----------


function deCrypt(inputEl) {
    inputMsg.value = ""
    let code = ""
    let clean = inputEl

    let numFix = numDecrypter(clean)
    let symFix = symbolDecrypter(numFix)

    let result = symFix;

    for(let sym of symbols) {
        result = result.replaceAll(sym, ",");
    }

    let cleanArray = result.split(",").filter(Boolean).map(Number)
    
    
    for(let n of cleanArray) {
        code += String.fromCharCode(n)
    }
    outputEl.textContent = code
}




// num swapper
function numSwapper(array) {
    let swappedCode = ""

    for (let i = 0; i < array.length; i++){
        let char = array[i]
        if (numSwapMap[char]){
            swappedCode += numSwapMap[char]
        }
        else{
            swappedCode += char
        }
    }
    return swappedCode

}

function symbolSwapper(str) {
    let output = ""
    for (let i = 0; i < str.length; i++) {
        let char = str[i]
        if(symbolSwapMap[char]){
            output += symbolSwapMap[char]
        }
        else{
            output += char
        }
    }
    return output
}

// symbol decrypter

function symbolDecrypter(input) {

    let output =""
    for(let i = 0; i < input.length; i++) {
        let char = input[i]
        if(symOriginal[char]){
            output += symOriginal[char]
        }
        else{
            output += char
        }

    }
    return output
}




// number decrypter
function numDecrypter(input) {
    
    let output = ""
    for (let i = 0; i < input.length; i++) {
        let char = input[i]

        if (numOriginal[char]) {
            output += numOriginal[char]
        }
        else{
            output += char
        }
    }
    return output
}


// originalizer 
function makeOriginalMap(map) {
    const original = {}
     for(let key in map) {
        const value = map[key]
        original[value] = key
     }
     return original
}