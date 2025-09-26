import { updateTechnicalElementScore } from "./base-value.js";
import { ResetButtonsElements } from "./buttons.js";
import { Program } from "./ScoreCalc.js";

export function RenderName(elem) {
   let name = ""
   if (elem.Specification && elem.Specification != "Cr" && elem.Specification != "Linear and Rotating") {
      name = elem.Specification + elem.Element + elem.Lvl

   } else if (elem.AdditionalFeature) {
      name = elem.Element + elem.Lvl + " + " + elem.AdditionalFeature + elem.AdditionalFeatureLvl
   } else {
      name = elem.Element + elem.Lvl
   }

   if (elem.Downgrades) {
      name += elem.Downgrades
   }
   return name
}

export function renderElements() {
   const tbody = document.querySelector('.displayTable');
   tbody.innerHTML = '';
   Program.Elements.forEach((parts, idx) => {
      const tr = document.createElement('tr')
      tr.dataset.index = String(idx)
      tr.draggable = true
      tr.innerHTML = `
          <td class="text-center"><i class="bi bi-grip-vertical handle"></i></td>
          <td>${idx + 1}</td>
          <td>${RenderName(parts)}</td>
          <td>${parts.BaseValue.toFixed(2)}</td>
          <td>${parts.GOE > 0 ? ('+' + parts.GOE) : parts.GOE}</td>
          <td>${parts.GoeValue.toFixed(2)}</td>
          <td class="elemScore">${parts.ElementScore.toFixed(2)}</td>
          <td class="text-nowrap">
            <button class="btn btn-sm btn-outline-secondary edit"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger delete"><i class="bi bi-trash"></i></button>
          </td>`;
      tbody.appendChild(tr)
   })
   attachRowHandled()
}
window.renderElements = renderElements
window.RenderName = RenderName

function attachRowHandled() {
   const tbody = document.querySelector('.displayTable');
   tbody.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.closest('tr').dataset.index, 10);
      Program.Elements.splice(idx, 1)
      renderElements()
      updateTechnicalElementScore()
   }))
   tbody.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.closest('tr').dataset.index, 10);
      Program.EditingIndex = idx;
      loadElementIntoUI(Program.Elements[idx]);
   }));

}



export function loadElementIntoUI(Element) {
   if (!Element || Element.length === 0) return
   ResetButtonsElements()

   document.getElementById(Element.Tab + "-tab").click()

   document.getElementById(Element.Element).checked = true
   document.querySelector("#" + Element.Tab + " input[value='" + Element.Lvl + "']").checked = true

   if (Element.AdditionalFeature) {
      document.getElementById(Element.AdditionalFeature).checked = true
      document.querySelectorAll("#" + Element.Tab + " input[value='" + Element.AdditionalFeatureLvl + "']")[1].checked = true
   }

   if (Element.Specification === "A" || Element.Specification === "P") {
      document.getElementById(Element.Specification).checked = true
   }

   if (Element.Downgrades) {
      document.querySelector("#" + Element.Tab + " input[value='" + Element.Downgrades + "']").checked = true
   }

   document.getElementById("GOE" + Element.GOE).checked = true


}

window.loadElementIntoUI = loadElementIntoUI