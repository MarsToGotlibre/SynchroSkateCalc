//Adding an Element

//returns Active Tab
export function ActiveTab() {
   return document.querySelector(".tab-content .show").id
}

//Temporary function for debugging
function ReturnElements() {
   let activetab = document.querySelector(".tab-content .show").id
   let SelectedButtons = document.querySelectorAll("#" + activetab + " input:checked")
   return [SelectedButtons, activetab]
}

// Base Element for futur construction
const BaseElement = {
   Tab: null,
   Element: null,
   Lvl: "1",
   AdditionalFeature: null,
   AdditionalFeatureLvl: "B",
   Specification: null,
   Downgrades: null,
   GOE: "0",
   BaseValue: 0.0,
   GoeValue: 0,
   ElementScore: 0
}


//modifies Base Element to create a new elem
export function addElement() {
   let newElem = BaseElement
   let activetab = ActiveTab()

   const ifAddTo = (node, nodeParam, ElementEntry) => {
      let Node = document.querySelector(node)
      if (Node) {
         newElem[ElementEntry] = Node[nodeParam]
      }
   }

   ifAddTo("#GOE input:checked", "value", "GOE")


   newElem.Tab = activetab
   if (activetab === "lines-rotating") {
      newElem.Element = document.querySelector("#lines-rotating input[name='LR']:checked").id

      ifAddTo("#lines-rotating input[name='Specifications']:checked", "id", "Specification")
      ifAddTo("#lines-rotating input[name='Levels LR']:checked", "value", "Lvl")
      return newElem


   } else if (activetab === "intersection-no-hold") {
      newElem.Element = document.querySelector("#intersection-no-hold input[name='INHE']:checked").id
      let AdditionalFeature = document.querySelector("#intersection-no-hold input[name='sPi']:checked")
      if (AdditionalFeature) {
         newElem.AdditionalFeature = AdditionalFeature.id
         ifAddTo("#intersection-no-hold input[name='Levels sPi']:checked", "value", "AdditionalFeatureLvl")
      }
      return newElem

   } else {
      newElem.Element = document.querySelector("#other input[name='Other']:checked").id
      ifAddTo("#other input[name='Downgrades']:checked", "value", "Downgrades")
      ifAddTo("#other input[value='Cr']:checked", "value", "Specification")
      ifAddTo("#other input[name='Levels Other']:checked", "value", "Lvl")
      return newElem
   }
}


//debugg

window.addElement = addElement
window.ActiveTab = ActiveTab
