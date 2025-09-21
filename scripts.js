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

/* Rules to disabled some inputs being selected together */


/* Tab NHE and I */

function NHEandItab() {
    const NHE = document.getElementById("btnNHE")
    const I = document.getElementById("btnI")

    const Pi = document.getElementById("btnPi")
    const s = document.getElementById("btns")


    //disabled the possibility to have I whith s and NHE with Pi
    NHE.addEventListener("click", function () {
        Pi.disabled = true
        s.disabled = false
    })
    I.addEventListener("click", function () {
        Pi.disabled = false
        s.disabled = true
    })

    Pi.addEventListener("change", function () {
        NHE.disabled = Pi.checked
        I.disabled = s.checked
    })

    s.addEventListener("change", function () {
        NHE.disabled = Pi.checked
        I.disabled = s.checked
    })
}
NHEandItab()



/* Rests of the rules */

/* 
rules: configuration array defining relationships between form elements.

Each object in the array describes one "rule" and contains:

- triggers  : CSS selector (string) OR a NodeList/array of elements.
              These are the elements that will trigger an update when they change.

- targets   : CSS selector (string) OR a NodeList/array of elements.
              These are the elements that will be enabled/disabled based on the triggers' state.

- condition : function that receives the current trigger element and must return true or false.
              If it returns true → all targets will be disabled.
              If it returns false → all targets will be enabled.

*/

const rules = [
    {
        //disable pivot button when non pivoting element is selected
        triggers: "#LR input",
        targets: "#btnP",
        condition: trigger => trigger.classList.contains("NonPivoting")
    },
    {
        //Disable Non pivoting element to be selected when 
        // pivoting sepcification is selected
        triggers: "#Specifications input",
        targets: "#LR .NonPivoting",
        condition: () => document.getElementById("btnP").checked
    },
    {
        //disable downgrades when element isn't downgradable
        triggers: "#ElementOther div input",
        targets: DowngradeCheckbox,
        condition: trigger => !trigger.classList.contains("downgradable")
    }, {
        // disable non downgradble elements when downgrade is selcted
        triggers: DowngradeCheckbox,
        targets: "#ElementOther div input:not(.downgradable)",
        condition: trigger => trigger.checked
    },
    {
        //disable other levels than 1 if element Only has one Elment available
        triggers: "#ElementOther div input",
        targets: "#LevelOther input:not(#Lvl1Other)",
        condition: trigger => trigger.classList.contains("1Lvl")
    },
    {
        //disable 1Lvl elements if Lvl other than 1 selected
        triggers: "#LevelOther input",
        targets: "#OneLvl input",
        condition: trigger => trigger.id != "Lvl1Other"
    },
    {
        //disable Lvl more than 2 if Artistic (A) is selected
        triggers: "#Specifications input",
        targets: "#LevelsLR .Lvl2plus",
        condition: trigger => trigger.id == "btnA" && trigger.checked
    }, {
        //disable Artistic(A), if Level more than 2 selected
        triggers: "#LevelsLR input",
        targets: "#btnA",
        condition: trigger => trigger.classList.contains("Lvl2plus")
    }
];

/**
 * setupRules applies a set of rules to enable/disable input elements dynamically.
 *
 * Each rule defines:
 *   - triggers: CSS selector string, NodeList, or array of elements that will trigger the rule
 *   - targets: CSS selector string, NodeList, or array of elements that will be enabled/disabled
 *   - condition: a function receiving the trigger element, returning true or false
 *                (true → targets.disabled = true, false → targets.disabled = false)
 *
 * @param {Array} rules - An array of rule objects describing input dependencies.
 *
 * Usage example:
 *   setupRules([
 *     {
 *       triggers: "#myInput",
 *       targets: "#otherInput",
 *       condition: trigger => trigger.checked
 *     }
 *   ]);
 */

function setupRules(rules) {
    rules.forEach(rule => {
        //verify if the selector is an css selecor or a NodeList, convert css selector into node if needed
        const triggers = (rule.triggers instanceof NodeList) ? rule.triggers : document.querySelectorAll(rule.triggers)
        const targets = (rule.targets instanceof NodeList) ? rule.targets : document.querySelectorAll(rule.targets)

        //puts an EventListener for each trigger
        triggers.forEach(trigger => {
            trigger.addEventListener("change", () => {
                const state = rule.condition(trigger)
                //for each target, disable or enable the taget depending on state
                targets.forEach(target => target.disabled = state)
            });
        });
    });
}

setupRules(rules);
