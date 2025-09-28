import { RenderName } from "./Table.js";
import { getElement } from "./CreateElementFromUser.js";

export function ElemPreview() {
   const elemDiv = document.querySelector(".div-elem-disp")
   const ElemePreselected = getElement()
   if (!ElemePreselected.Element) {
      ElemePreselected.Element = ""
   }
   elemDiv.innerHTML = RenderName(ElemePreselected)
}