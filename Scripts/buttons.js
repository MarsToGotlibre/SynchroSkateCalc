import { ActiveTab } from "./addElements.js"
import { addElement, Program } from "./ScoreCalc.js"
import { updateSkatingSkills, updateCompostion, updatePresentation, updateFactor, updateDeduction } from "./base-value.js"
import { renderElements } from "./Table.js"


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
        console.log(Program)

    }

})

pcsCo.addEventListener("input", () => {
    updateCompostion()
})

pcsSs.addEventListener("input", () => {
    updateSkatingSkills()
})

pcsPr.addEventListener("input", () => {
    updatePresentation()
})

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
