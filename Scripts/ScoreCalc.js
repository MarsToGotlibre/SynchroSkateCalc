import { getElement } from "./addElements.js"
import {
   getElementBaseValue, GOECalculation, getScoreElement,
   updateTechnicalElementScore, updateTotalSegementScore
} from "./base-value.js"

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
   TTS: 0
}
window.Program = Program

export function addElement() {
   let newElem = getElement()
   getElementBaseValue(newElem)
   GOECalculation(newElem)
   getScoreElement(newElem)

   Program.Elements.push(newElem)
   updateTechnicalElementScore()
   updateTotalSegementScore()

}