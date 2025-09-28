import { RenderName } from "./Table.js";
import { getElement } from "./CreateElementFromUser.js";

export function ElemPreview() {
   const elemDiv = document.querySelector(".Element-display")
   const Goespan = document.querySelector(".goe-display")
   const ElemePreselected = getElement()
   if (!ElemePreselected.Element) {
      ElemePreselected.Element = ""
   }
   elemDiv.innerHTML = RenderName(ElemePreselected)
   Goespan.innerHTML = ElemePreselected.GOE > 0 ? ('+' + ElemePreselected.GOE) : ElemePreselected.GOE
}

export function ResetPreview() {
   document.querySelector(".Element-display").innerHTML = "Element"
   document.querySelector(".goe-display").innerHTML = ""
}