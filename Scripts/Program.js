import { getElement } from "./GetElementFromUser.js"
import {
   getElementBaseValue, GOECalculation, getScoreElement,
   updateTechnicalElementScore, updateTotalSegementScore
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