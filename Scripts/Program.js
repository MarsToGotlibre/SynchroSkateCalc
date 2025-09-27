import { getElement } from "./GetElementFromUser.js"
import {
   getElementBaseValue, GOECalculation, getScoreElement
} from "./elementCalculations.js"
import { renderElements } from "./Table.js"

export let Program = {
   Elements: [],
   Component: {
      Composition: 0.0,
      Presentation: 0.0,
      SkatingSkills: 0.0
   },
   Factor: 2.67,
   deductions: 0,
   PCS: 0,
   TES: 0,
   TTS: 0,
   EditingIndex: null, //When editing an Element, this elementsindex loads Here. See addElement()
   Deductions: 0
}
window.Program = Program

export function addElement() {
   const newElem = getElement()

   let bv = getElementBaseValue(newElem)
   if (!bv) {
      return
   }
   GOECalculation(newElem)
   getScoreElement(newElem)

   if (Program.EditingIndex != null) { //if we are changing an elements content 
      Program.Elements[Program.EditingIndex] = newElem
      Program.EditingIndex = null
   } else {
      Program.Elements.push(newElem)
   }
   updateTechnicalElementScore()
   updateTotalSegementScore()
   renderElements()

}

export function updateFactor() {
   Program.Factor = Number(parseFloat(document.getElementById("pcs-factor").value) || 2.67)
   UpdateComponantScore()
}

export function UpdatePCSandPCSbadges() {
   const Composition = Number(document.getElementById('pcs-co').value || 0)
   const SkatingSkills = Number(document.getElementById('pcs-ss').value || 0)
   const Presentation = Number(document.getElementById('pcs-pr').value || 0)
   document.getElementById('pcs-co-val').textContent = Composition.toFixed(2)
   document.getElementById("pcs-pr-val").textContent = Presentation.toFixed(2)
   document.getElementById("pcs-ss-val").textContent = SkatingSkills.toFixed(2)
   Program.Component.SkatingSkills = SkatingSkills
   Program.Component.Composition = Composition
   Program.Component.Presentation = Presentation
   UpdateComponantScore()
}


export function updateTechnicalElementScore() {
   Program.TES = 0
   Program.Elements.forEach(element => {
      Program.TES += element.ElementScore
   });
   Program.TES = Math.round(Program.TES * 100) / 100
   document.getElementById("tes").innerHTML = Program.TES.toFixed(2)
   updateTotalSegementScore()
}

export function UpdateComponantScore() {
   Program.PCS = 0
   Object.values(Program.Component).forEach(comp => {
      Program.PCS += comp
   })
   Program.PCS *= Program.Factor
   Program.PCS = Math.round(Program.PCS * 100) / 100
   document.getElementById("pcs").innerHTML = Program.PCS.toFixed(2)
   updateTotalSegementScore()

}

export function updateDeduction() {
   Program.Deductions = Number(deduct.value || 0)
   updateTotalSegementScore()
}

export function updateTotalSegementScore() {
   Program.TTS = Program.PCS + Program.TES + Program.Deductions
   document.getElementById("tss").innerHTML = Program.TTS.toFixed(2)

}