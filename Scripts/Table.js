import { updateTechnicalElementScore } from "./base-value.js";
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
}