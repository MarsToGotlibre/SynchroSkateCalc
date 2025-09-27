import { Program } from "./Program.js";

export let SOV = null

export async function initSOV() {
   if (SOV) return;

   try {
      console.log('Attempting to fetch SOV JSON data...')
      const res = await fetch('./synchro-base-value.json');
      console.log('Fetch response status:', res.status, res.statusText);

      if (!res.ok) {
         throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      SOV = await res.json();
      console.log('SOV data loaded successfully. Elements count:', Object.keys(SOV.elements || {}).length);
   } catch (error) {
      console.error('Error loading SOV data:', error);
      throw new Error(`Failed to load SOV data: ${error.message}`);
   }
}



export function getElementBaseValue(newElem) {
   if (!SOV) {
      initSOV()
      return null
   }
   if (newElem.AdditionalFeature !== null) {
      newElem.BaseValue = SOV.elements[newElem.Element][newElem.Lvl][newElem.AdditionalFeature + newElem.AdditionalFeatureLvl]
   } else if (newElem.Specification) { //If A, P, Cr, Element with same sepcification have the same base value
      newElem.BaseValue = SOV.elements[newElem.Specification][newElem.Lvl]
   }
   else {
      newElem.BaseValue = SOV.elements[newElem.Element][newElem.Lvl]
   }
   if (newElem.Downgrades) {
      newElem.BaseValue += SOV.elements.Downgrades[newElem.Downgrades]
   }
   return true

}

export function GOECalculation(Element) {
   Element.GoeValue = (Element.GOE / 10) * Element.BaseValue
}

export function getScoreElement(Element) {
   Element.ElementScore = Math.round((Element.GoeValue + Element.BaseValue) * 100) / 100
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

window.initSOV = initSOV()