const inputMsg = document.getElementById("input-field")
const outputEl = document.getElementById("output-el")
const encryptBtn = document.getElementById("enctypt-btn")
const decryptBtn = document.getElementById("decrypt-btn")

const symbols = [
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "-", "_", "=", "+", "[", "]", "{", "}", ";", ":",
    "'", ",", ".", "<", ">", "/", "?", "|",
    "~", "`"
]

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

function encrypt(inputEl){
    

    inputMsg.value = ""
    let code = ""
    for (let i = 0; i < inputEl.length; i++) {
        code += `${getSymbol(symbols)}${inputEl.charCodeAt(i)}`
    }
    outputEl.textContent = code
}

function deCrypt(inputEl) {
    inputMsg.value = ""
    let code = ""

    let clean = inputEl

    for(let sym of symbols) {
        clean = clean.replaceAll(sym, ",")
    }

    let cleanArray = clean.split(",").filter(Boolean).map(Number)
    
    
    for(let n of cleanArray) {
        code += String.fromCharCode(n)
    }
    outputEl.textContent = code
}
