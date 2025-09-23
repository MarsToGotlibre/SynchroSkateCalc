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

