/* Differents Checkboxed */
const SpecificationCheckbox = document.querySelectorAll("#Specifications input")
const AdditionalFeatureCheckbox = document.querySelectorAll("#Additional_feature input")
const DowngradeCheckbox = document.querySelectorAll("#Downgrades input")

/**
 * Allow only one checkbox to be checked among a group of checkboxes.
 *
 * @param {NodeListOf<HTMLInputElement>} checkboxNodes - The list of checkbox input elements.
 */
function radioCheckbox(checkboxNode) {
    checkboxNode.forEach((checkbox) => {
        checkbox.addEventListener("click", function (event) {
            checkboxNode.forEach((cb) => {
                if (cb !== this) {
                    cb.checked = false
                    /* console.log(cb.id, " : unchecked") */
                }
            })
        })
    })
}

radioCheckbox(AdditionalFeatureCheckbox)
radioCheckbox(SpecificationCheckbox)
radioCheckbox(DowngradeCheckbox)