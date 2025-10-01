import { ActiveTab } from "./CreateElementFromUser.js"
import { addElement, updateFactor, updateDeduction, UpdatePCSandPCSbadges } from "./Program.js"
import { ElemPreview, ResetPreview } from "./ElementPreview.js"

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
    ResetPreview()
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

//Element Preview
document.querySelectorAll("#ElementComposer input").forEach(button => {
    button.addEventListener("click", (event) => { ElemPreview() })
})
