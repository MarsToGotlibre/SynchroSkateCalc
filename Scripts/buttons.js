import { ActiveTab } from "./addElements.js"
import { addElement, Program } from "./ScoreCalc.js"
import { updateFactor, updateDeduction, UpdatePCSandPCSbadges } from "./base-value.js"

//Clearing Entry
const buttonsElements = document.querySelectorAll("#ElementComposer input")

export function ResetButtonsElements() {
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
    if (Elem) {
        addElement()
        ResetButtonsElements()
    }

})

//PCS badge update
document.getElementById('pcs-co').addEventListener("input", UpdatePCSandPCSbadges)
document.getElementById('pcs-pr').addEventListener("input", UpdatePCSandPCSbadges)
document.getElementById('pcs-ss').addEventListener("input", UpdatePCSandPCSbadges)


//update theDeduction and PCS factor into calculation
const deduct = document.getElementById("deduct")
const event = ["input", "keyup", "paste", "change", "click"]
const pcsFactor = document.getElementById("pcs-factor")
event.forEach(ev => {
    pcsFactor.addEventListener(ev, () => {
        updateFactor()
    })
    deduct.addEventListener(ev, () => {
        updateDeduction()
    })
})
