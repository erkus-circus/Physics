import configureControllerBox, { updateControl } from "./Controller";
import Initialize from "./Gravity/gravity";
import Obj from "./Obj";
import { globalOriginVector } from "./Render";
import Vector from "./Vector";

// all of the objects in the game
export var objects: Obj[] = []

// world settings:

// framerate
export const fps: number = 1000 / 60;
// the position of the mouse
export var mouseVector: Vector;

window.addEventListener("load", () => mouseVector = globalOriginVector);
window.addEventListener("load", Initialize);
window.addEventListener("load", () => {
    configureControllerBox();
    document.getElementById("selector-box-Object").click()
    
})

// for simulations: 
window.addEventListener("load", () => {

    document.getElementById("clear-button").addEventListener("click", () => {
        while(objects.length > 0) {
            objects.pop()
        }
    })

    document.getElementById("earth-obj-button").addEventListener("click", () => {
        updateControl("Object.Mass", 5.997E24)
        updateControl("Object.Density", 5514)
        updateControl("Object.Omega", 0.00007292115)
        updateControl("View.Zoom", 1E-5)
    })
})