/**
 * Eric Diskin
 * Nov 17, 2023
 * Controller:
 *  An overlay that contains information on the world and contains controls for the system and its objects
 */

import { controls } from "./Gravity/controls";

// for the movement of the controller box.


// only called once, when the window is loaded.
export default function configureControllerBox() {
    /// The movement of the box
    let sel = <HTMLElement>document.getElementsByClassName("selector-box-main")[0];
    // sets to true when the box is being dragged.
    
    let movingControllerBox = false;
    // set its position to the middle ish of the screen
    sel.style.left = window.innerWidth / 5 + "px";
    sel.style.top = window.innerHeight / 5 + "px";

    // when the mouse is down & its target is the box, move it.
    sel.onmousedown = function (e) {
        if (e.target === sel) {
            movingControllerBox = true
        }
    };

    sel.addEventListener("dblclick", (e) => {
        if (e.target === sel) {
            // toggle the visibility of the controller box.
            Array.from(sel.children).forEach((c: HTMLElement) => {
                c.style.display = c.style.display == "block" ? "none" : "block"
            })
        }
    })

    // when the mouse is lifted stop moving it.
    window.addEventListener("mouseup", function (e) {
        movingControllerBox = false;
    });

    // move the box
    window.addEventListener("mousemove", function (e) {
        if (movingControllerBox) {
            if (e.clientX - 32 < 0 || e.clientX + 16 > window.innerWidth ||
                e.clientY - 32 < 0 || e.clientY + 16 > window.innerHeight) {
                return;
            }
            // center the box around the cursor.
            sel.style.top = e.clientY - 16 + 'px';
            sel.style.left = e.clientX - 16 + 'px';
        }
    });
    
    /// creating the panels
    // the controls variable contains the data for the objects.
    for (const p of Object.keys(controls)) {
        // the properties this page contains
        let page = controls[p]
        // the page itself
        let pageDiv = document.createElement("DIV")
        pageDiv.className = "page-outline page selector-box-content-menu hidden";
        pageDiv.id = "selector-box-page-" + p;

        // create the title of the content menu page.
        let pageTitle = document.createElement("SPAN")
        pageTitle.className = "selector-box-title"
        pageTitle.innerHTML = p
        pageDiv.append(pageTitle)

        

        // now, create all the inputs and their events.
        for (const ctrl in page) {
            // create the container for the input:
            var inputContainer = <HTMLInputElement>document.createElement("SPAN")
            inputContainer.className = "selector-input"
            inputContainer.innerText = ctrl
             
            // if the control is a number:
            if (page[ctrl].type === "number") {
                let inputEl = <HTMLInputElement>document.createElement("INPUT")
                // set the type of the input.
                inputEl.className = "selector-box-input"
                inputEl.style.display = "inline"
                inputEl.type = "number"
                inputEl.value = page[ctrl].value
                inputEl.id = `controls.${p}.${ctrl}`
                // events
                inputEl.addEventListener("keypress", (e) => {
                    // change the value of the control.
                    if (e.target instanceof Element) {
                        //@ts-ignore
                        controls[p][ctrl].value = Number.parseFloat(e.target.value)
                    }
                })
                inputEl.addEventListener("change", (e) => {
                    // change the value of the control.
                    controls[p][ctrl].value = Number.parseFloat(inputEl.value)
                })
                inputContainer.append(inputEl)
            } else if (page[ctrl].type === "coordinates") {
                let inputElX = <HTMLInputElement>document.createElement("INPUT")
                // set the type of the input.
                inputElX.className = "selector-box-input"
                inputElX.style.display = "inline"
                inputElX.type = "number"
                inputElX.value = page[ctrl].x

                // events
                inputElX.addEventListener("keypress", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].x = e.target.value
                })
                inputElX.addEventListener("change", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].x = e.target.value
                })
                
                let inputElY = <HTMLInputElement>document.createElement("INPUT")
                // set the type of the input.
                inputElY.className = "selector-box-input"
                inputElY.style.display = "inline"
                inputElY.type = "number"
                inputElY.value = page[ctrl].y

                inputElY.addEventListener("keypress", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].y = e.target.value
                })
                inputElY.addEventListener("change", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].y = e.target.value
                })
                
                inputContainer.append(inputElX, inputElY)
            } else if (page[ctrl].type === "vector") {
                let inputElMag =<HTMLInputElement>document.createElement("INPUT")
                // set the type of the input.
                inputElMag.className = "selector-box-input"
                inputElMag.style.display = "inline"
                inputElMag.type = "number"
                inputElMag.value = page[ctrl].magnitude

                // events
                inputElMag.addEventListener("keypress", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].magnitude = e.target.value
                })
                inputElMag.addEventListener("change", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].magnitude = e.target.value
                })
                
                let inputElDir = <HTMLInputElement>document.createElement("INPUT")
                // set the type of the input.
                inputElDir.className = "selector-box-input"
                inputElDir.style.display = "inline"
                inputElDir.type = "number"
                inputElDir.value = page[ctrl].direction

                inputElDir.addEventListener("keypress", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].direction = e.target.value
                })
                inputElDir.addEventListener("change", (e) => {
                    // change the value of the control.
                    //@ts-ignore
                    controls[p][ctrl].direction = e.target.value
                })
                
                inputContainer.append(inputElMag, inputElDir)
            } else if (page[ctrl].type === "bool") {
                // fofr a checkbox/bool type of control.
                let switchContainer = document.createElement("LABEL")
                switchContainer.className = "selector-box-switch"
                let switchInput = <HTMLInputElement>document.createElement("INPUT")
                switchInput.type = "checkbox"
                switchInput.id = `controls.${p}.${ctrl}`
                switchInput.className = "selector-box-input hidden"
                switchInput.checked = controls[p][ctrl].value
                let switchSlider = document.createElement("SPAN")
                switchSlider.className = "selector-box-slider"

                // the events for the input
                switchInput.addEventListener("change", (e) => {
                    controls[p][ctrl].value = !controls[p][ctrl].value
                })
                
                switchContainer.append(switchInput, switchSlider)
                inputContainer.append(switchContainer)
            }
            else if (page[ctrl].type === "button") {
                // fofr a checkbox/bool type of control.
                let button = document.createElement("BUTTON")
                button.className = "selector-box-btn"
                button.id = `controls.${p}.${ctrl}`
                button.innerHTML = "Click"

                // the events for the input
                button.addEventListener("click", (e) => {
                    try {
                        controls[p][ctrl].action()
                    } catch (error) {
                        console.error(error)
                    }
                })
                

                inputContainer.append(button)
            }

            pageDiv.append(inputContainer)
        }

        document.getElementsByClassName("selector-box-menu")[0].append(pageDiv)
    }




    /// Selecting and changing panels.

    // each .selector-box-section will show its panel and become selected when it is clicked.
    let panelButtons = document.getElementsByClassName("selector-box-section")

    Array.from(panelButtons).forEach((el) => {
        el.addEventListener("click", (e) => {
            // make the other buttons deselected, 
            Array.from(panelButtons).forEach((el2) => el2.classList.remove("btn-selected"))
            // then select this box.
            el.classList.add("btn-selected")

            // hide every other panel
            Array.from(document.getElementsByClassName("selector-box-content-menu")).forEach(element => {
                element.classList.add("hidden")
            })
            // next, extract the name of the panel and show it.
            document.getElementById("selector-box-page-" + el.id.split("-").pop()).classList.remove("hidden")
        })
    })
}

export function updateControl(location, value) {
    let l = location.split(".").reduce((pv, cv) => pv[cv], controls)

    if (l.type == "number" || l.type == "bool") {
        //@ts-ignore
        document.getElementById("controls." + location).value = value
        //@ts-ignore
        document.getElementById("controls." + location).checked = value
        document.getElementById("controls." + location).dispatchEvent(new Event('change'));
    } else if (l.type === "coordinates") {
        
    }
}