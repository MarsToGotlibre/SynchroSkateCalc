import { ActiveTab, addElement } from "./addElements.js"


//Clearing Entry
const buttonsElements = document.querySelectorAll("#ElementComposer input")

function ResetButtonsElements() {
    buttonsElements.forEach(button => {
        button.checked = false
        button.disabled = false
    })
}

//Button Clear Entry
const ClearEntry = document.getElementById("ClearEntry")
ClearEntry.addEventListener("click", (event) => {
    ResetButtonsElements()
})





//button addElement
document.getElementById("AddElement").addEventListener("click", (event) => {
    let Elem = document.querySelector("#" + ActiveTab() + " .Element input:checked")
    console.log(Elem)
    if (Elem) {
        addElement()
    }

})