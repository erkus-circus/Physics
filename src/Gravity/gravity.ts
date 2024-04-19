import { updateControl } from "../Controller";
import Coordinate from "../Coordinate";
import { fps, mouseVector, objects } from "../Main";
import Obj from "../Obj";
import { clearCanvas, drawGrid, drawVector, renderMouse } from "../Render";
import Vector from "../Vector";
import { controls } from "./controls";

let gravity = true
// the speed at which the user is able to scroll using the arrow keys
let scrollSpeed = 20
// deltatime (measured in what units?)
var dt: number = 0;
// for calculating dt
var lastTime: number = performance.now();

let frame = 0
async function nthFrame(func, fno) {
    if (frame % fno === 0) {
        await func()
    }
}

export default function Initialize () {
    // the game loop
    setInterval(() => {
        try {
            // console.log(objects);
            
        } catch (er) {
            
        }
        
        frame++;
        clearCanvas()
        // draw the grid
        drawGrid()
        
        // calculate delta time
        let time = performance.now()
        dt = (time - lastTime) / fps * controls.System.Simulation_Speed.value

        if (!controls.System.Paused.value) {

            // update and render the objects
            objects.forEach((obj, i) => {
                if (obj.mass <= 0) {
                    objects.splice(i, 1)
                }
                obj.update(dt)
            })

            // calculate the gravity of all objects
            for (let i = 0; i < objects.length; i++) {
                var totalAcceleration = new Vector(0, 0)

                for (let j = 0; j < objects.length; j++) {
                    // an object compared with itself has infinite gravity
                    if (i == j) {
                        continue
                    }

                    // calculate the gravity of each object towards each other one
                    var gravityVector = Vector.Subtract(objects[j].pos, objects[i].pos)
                    gravityVector.magnitude = controls.System.Gravity.value * ((objects[i].mass * objects[j].mass) / Vector.Subtract(objects[i].pos, objects[j].pos).power(2).magnitude)


                    // calculate the force of electric charge 
                    var eforceVector = Vector.Subtract(objects[j].pos, objects[i].pos)
                    eforceVector.magnitude = (1 / (4 * Math.PI * controls.System.Permeability_Constant.value)) * ((objects[i].charge * objects[j].charge) / Vector.Subtract(objects[i].pos, objects[j].pos).power(2).magnitude)

                    // drawVector(gravityVector.multiplyByScalar(500), "red", objects[i].pos)
                    // detect collision:
                    // first get positions of both objects in the coordinate plane
                    let obj1Pos = Coordinate.FromVector(objects[i].pos)
                    let obj2Pos = Coordinate.FromVector(objects[j].pos)
                    // second, get the distance between both of the points
                    let d = Coordinate.DistanceFrom(obj1Pos, obj2Pos)
                    // the maximum distance is both of the objects radiuses summed
                    // let maxD = Math.sqrt(objects[i].mass / (Math.PI * objects[i].density)) + Math.sqrt(objects[j].mass / (Math.PI * objects[j].density))
                    let maxD = objects[i].radius() + objects[j].radius()

                    
                    if ((!controls.System.Elastic_Collisions.value && d <= maxD) && objects[i].mass <= objects[j].mass) {
                        // perfectly inelastic collisions:
                        objects[j].velocity = Vector.Add(objects[i].velocity.multiplyByScalar(objects[i].mass), (objects[j].velocity.multiplyByScalar(objects[j].mass))).multiplyByScalar(1 / (objects[i].mass + objects[j].mass))
                        // the locked property is dominant
                        objects[j].locked = objects[j].locked || objects[i].locked
                        objects[j].mass += objects[i].mass
                        objects[j].charge += objects[i].charge
                        objects[i].mass = 0
                        
                        
                        continue
                    } if (controls.System.Elastic_Collisions.value && d <= maxD && objects[i].mass <= objects[j].mass && objects[i].distance > objects[j].distance) {
                        let tempVm = objects[i].velocity.magnitude 
                        let tempVd = objects[i].velocity.direction
                        // m1v1=m2v2 ==> v = m1v/m2
                        objects[i].velocity = objects[j].velocity.multiplyByScalar(objects[j].mass / objects[i].mass)
                        objects[j].velocity = new Vector(tempVm, tempVd).multiplyByScalar(objects[i].mass / objects[j].mass)

                    } else {
                        totalAcceleration = Vector.Add(totalAcceleration, gravityVector.negative())
                        totalAcceleration = Vector.Add(totalAcceleration, eforceVector)
                    }
                }
                
                // set the final gravity
                objects[i].acceleration = totalAcceleration.multiplyByScalar(1 / objects[i].mass)
                if(gravity) objects[i].acceleration = objects[i].acceleration.negative()
            }
        }

        /**
         * Controls:
         * Arrows: Look Around
         * M: Increase size of object
         * N: Decrease size of object
         * +: Increase initital velocity of object
         * -: Decrease initital velocity of object
         * Z: Rotate initial velocty counter-clockwise
         * X: Rotate initial velocty clockwise
         * Space: Pause
         * L: Increase gravity (by magnitudes of 2)
         * L: Decrease gravity (by magnitudes of 2)
         * D: controls.View.Zoom screen up
         * S: controls.View.Zoom screen down
         * G: Increase scroll speed
         * F: Decrease scroll speed
         * H: Reset View
         */
        // keypresses:
        if (keysPressed.indexOf("ArrowUp") >= 0) {
            controls.View.View_Coordinates.y += scrollSpeed
            let a = Coordinate.FromVector(mouseVector)
            a.y += scrollSpeed
            mouseVector.update(Vector.FromCoord(a))
        }
        if (keysPressed.indexOf("ArrowDown") >= 0) {
            controls.View.View_Coordinates.y -= scrollSpeed
            let a = Coordinate.FromVector(mouseVector)
            a.y -= scrollSpeed
            mouseVector.update(Vector.FromCoord(a))
        }
        if (keysPressed.indexOf("ArrowLeft") >= 0) {
            controls.View.View_Coordinates.x += scrollSpeed
            let a = Coordinate.FromVector(mouseVector)
            a.x -= scrollSpeed
            mouseVector.update(Vector.FromCoord(a))
        }
        if (keysPressed.indexOf("ArrowRight") >= 0) {
            controls.View.View_Coordinates.x -= scrollSpeed
            let a = Coordinate.FromVector(mouseVector)
            a.x += scrollSpeed
            mouseVector.update(Vector.FromCoord(a))
        }
        if (keysPressed.indexOf(" ") >= 0) {
            updateControl("System.Paused", !controls.System.Paused.value)
            // so it doesnt randomly unpause
            keysPressed.splice(keysPressed.indexOf(" "), 1)
        }
        if (keysPressed.indexOf("=") >= 0) {
            let el = <HTMLInputElement>document.getElementById("controls.View.Zoom");
            updateControl("View.Zoom", parseInt(el.value) + 1 / Math.sqrt(parseInt(el.value)))
        }
        if (keysPressed.indexOf("Minus") >= 0) {
            let el = <HTMLInputElement>document.getElementById("controls.View.Zoom");
            updateControl("View.Zoom", parseInt(el.value) - 1 / Math.sqrt(parseInt(el.value)))
        }

        objects.forEach((obj) => {
            obj.render()
        })

        if (controls.Object.Placing.value) {
            // render the mouse circle
            renderMouse()
        }

        // for calculating delta time
        lastTime = time
    }, fps)
}

// to monitor which keys are pressed
var keysPressed = []
window.addEventListener("keydown", (e) => {
    //@ts-ignore
    if (e.target.tagName == "INPUT") return
    if (keysPressed.indexOf(e.key) == -1) {
        keysPressed.push(e.key)
        keysPressed.push(e.code)
    }
})

window.addEventListener("keyup", (e) => {
    //@ts-ignore
    if (e.target.tagName == "INPUT") return


    if (keysPressed.indexOf(e.key) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.key), 1)
    }
    if (keysPressed.indexOf(e.code) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.code), 1)
    }

    if (e.key == "Space") {
        updateControl("System.Paused", !controls.System.Paused.value)
    }
})

// when the mouse is moved, update the mouseVector
window.addEventListener("mousemove", (e) => {
    controls.View.View_Coordinates.x *= -1
    mouseVector.update(Vector.Add(Vector.FromCoord(new Coordinate(e.clientX / controls.View.Zoom.value, (window.innerHeight - e.clientY) / controls.View.Zoom.value)), Vector.FromCoord(controls.View.View_Coordinates).multiplyByScalar(1 / controls.View.Zoom.value)))
    controls.View.View_Coordinates.x *= -1
})

window.addEventListener("click", (e) => {
    if (e.target != document.getElementById("canvas") || !controls.Object.Placing.value) {
        // only place a new block if the acnvas was clicked
        return;
    }
    
    // converts the direction into radians
    var newObj = new Obj("gray", Vector.FromCoord(Coordinate.FromVector(mouseVector)), new Vector(controls["Object"]["Velocity"].magnitude, controls["Object"]["Velocity"].direction * Math.PI / 180), new Vector(0, 0), controls["Object"]["Mass"]["value"])
    newObj.density = controls.Object.Density.value
    newObj.theta = controls.Object.Theta.value
    newObj.omega = controls.Object.Omega.value
    newObj.alpha = controls.Object.Alpha.value
    newObj.charge = controls.Object.Charge.value
    objects.push(newObj)
})
