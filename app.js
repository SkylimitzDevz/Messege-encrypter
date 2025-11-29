const inputMsg = document.getElementById("input-field")
const outputEl = document.getElementById("output-el")
const encryptBtn = document.getElementById("enctypt-btn")
const decryptBtn = document.getElementById("decrypt-btn")

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
        code += `$${inputEl.charCodeAt(i)}`
    }
    outputEl.textContent = code
}

function deCrypt(inputEl) {
    inputMsg.value = ""
    let cleanArray = inputEl.split("$").slice(1).map(Number)  // convert to numbers
    let code = ""
    
    for (let i = 0; i < cleanArray.length; i++){
        code += String.fromCharCode(cleanArray[i])
    }
    outputEl.textContent = code
}
