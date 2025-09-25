let SOV = null

async function initSOV() {
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



function getElementBaseValue(newElem) {
   if (!SOV) {
      initSOV()
   }
   if (newElem.AdditionalFeature !== null) {
      console.log(SOV.elements[newElem.Element][newElem.Lvl][newElem.AdditionalFeature + newElem.AdditionalFeatureLvl])

      newElem.BaseValue = SOV.elements[newElem.Element][newElem.Lvl][newElem.AdditionalFeature + newElem.AdditionalFeatureLvl]
   } else if (newElem.Specification) {
      newElem.BaseValue = SOV.elements[newElem.Specification][newElem.Lvl]
   }
   else {
      newElem.BaseValue = SOV.elements[newElem.Element][newElem.Lvl]
   }
   if (newElem.Downgrades) {
      newElem.BaseValue += SOV.elements.Downgrades[newElem.Downgrades]
   }


}