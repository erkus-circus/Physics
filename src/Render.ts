import Coordinate from "./Coordinate";
import Vector from "./Vector";
import { controls } from "./Gravity/controls";
import { mouseVector } from "./Main";
import Obj from "./Obj";
// the canvas a rendering context
var canvas = <HTMLCanvasElement>document.getElementById("canvas")
var c = canvas.getContext("2d") ?? null;

// TODO: deprecated will be removed
export var globalOriginVector = new Vector(0, 0)

canvas.width = window.innerWidth
canvas.height = window.innerHeight


// draws a grid so it is easier to see an objects motion
export function drawGrid() {
    if(!controls.View.Grid.value) return;
    c.beginPath()

    // c.setTransform(1, 0, 0, 1, 0, 0);
    // c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    c.strokeStyle = "black"
    c.lineWidth = 1

    let units = [
        "mm", "cm", "m", "km"
    ]
    let i = 2
    let s = controls.View.Zoom.value
    if (!s) {
        s = 1
    }
    // optimize grid drawing, 
    // for example, when s < 1, change the units from m^2 to km^2, then so on and so forth
    while (s <= 1) {
        i += 1
        s *= 10
    }


    for (let Y = 0; Y < canvas.height; Y += s) {
        c.moveTo(0, Y)
        c.lineTo(canvas.width, Y)
    }
    c.stroke()

    for (let X = 0; X < canvas.width; X += s) {
        c.moveTo(X, 0)
        c.lineTo(X, canvas.height)
    }
    c.stroke()
    
    // draw in the bottom right corner the size of each square
    c.fillText(`1 x 1 ${units[i]}^2`, canvas.width - 50, canvas.height - 20)
}

// draws a dot on the screen at a certain point
export function drawPoint(x, y, color = "black") {
    c.beginPath()

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    c.fillStyle = color
    c.fillRect(x, canvas.height - y, 10, 10)
}

// draws a vector with its magnitude in pixels from the origin
export function drawVector(vector, color = "black", origin: Vector = globalOriginVector) {
    c.beginPath()

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    c.lineWidth = 1
    c.strokeStyle = color;
    var originCoord = Coordinate.FromVector(origin)
    c.moveTo(originCoord.x * controls.View.Zoom.value, canvas.height - originCoord.y * controls.View.Zoom.value)
    var x = -vector.getXComponent()
    var y = vector.getYComponent()

    c.lineTo(originCoord.x * controls.View.Zoom.value - x, canvas.height - y - originCoord.y * controls.View.Zoom.value)
    c.stroke()
}

// draws the statistics of an object
export function drawObjectStats(p, v, a) {
    var { x, y } = Coordinate.FromVector(p)
    y = canvas.height - y;
    c.beginPath()

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    c.font = "bold 30px serif";
    c.fillText("Pos: " + p.readable() + ", V: " + v.readable() + ", a: " + a.readable(), x, y)
}

// draws an object with its mass as the radius
export function drawObj(object: Obj, fill = true) {
    c.beginPath()

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    // c.fillStyle = object.color

    if (object.charge < 0) {
        c.fillStyle = "red"
    } else if (object.charge > 0) {
        c.fillStyle = "blue"
    } else {
        c.fillStyle = object.color
    }
    
    c.lineWidth = 5
    c.strokeStyle = object.color

    var { x, y } = Coordinate.FromVector(object.pos)



    c.arc(x * controls.View.Zoom.value, canvas.height - y * controls.View.Zoom.value, object.radius() * controls.View.Zoom.value, 0, 2 * Math.PI);
    if (fill) {
        c.fill()
    } else {
        c.stroke()
    }


    if (controls.View.Show_Velocity_Vector) drawVector(object.velocity.multiplyByScalar(controls.View.Zoom.value), "green", object.pos)
    if (controls.View.Show_Acceleration_Vector) drawVector(object.acceleration.multiplyByScalar(controls.View.Zoom.value), "red", object.pos)
    // now draw a black line in the direction of the rotation of the object.
    c.strokeStyle = "black"
    c.moveTo(x * controls.View.Zoom.value, canvas.height - y * controls.View.Zoom.value)
    c.lineTo(x * controls.View.Zoom.value + object.radius() * controls.View.Zoom.value * Math.cos(object.theta), canvas.height - y * controls.View.Zoom.value + object.radius() * controls.View.Zoom.value * Math.sin(object.theta))

    c.stroke()
}

export function renderMouse() {

    let obj = new Obj("black", mouseVector, new Vector(controls["Object"]["Velocity"].magnitude, controls["Object"]["Velocity"].direction / 180 * Math.PI), new Vector(0, 0), controls["Object"]["Mass"]["value"])
    obj.density = controls.Object.Density.value
    drawObj(obj, false)
}

// draws a vector at location v
export function drawVectorStat(v, color) {
    var { x, y } = Coordinate.FromVector(v)
    y = canvas.height - y;
    c.beginPath()

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    c.strokeStyle = color
    c.font = "bold 30px serif";
    c.fillText(v.readable(), x, y)
}

export function clearCanvas() {
    // reset the transformation
    c.setTransform(1, 0, 0, 1, 0, 0);
    // clear the screen every frame
    c.clearRect(0, 0, canvas.width, canvas.height)
}