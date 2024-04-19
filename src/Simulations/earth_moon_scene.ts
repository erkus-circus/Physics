import { updateControl } from "../Controller";
import Obj from "../Obj";
import Vector from "../Vector";

export default function earth_moon_scene () {
    
    updateControl("View.Zoom", 1 * Math.pow(10, -23))
    updateControl("View.Grid", false)

    let earth = new Obj("green")
    earth.mass = 5.97 * Math.pow(10,25)
    earth.density = 8 * Math.pow(10,24) / 2
    earth.locked = true
    // earth.velocity.magnitude = 0
    let moon = new Obj("gray")
    
    // kg
    moon.mass = 7.35 * Math.pow(10,22)
    moon.locked = true
    moon.density = 5 * Math.pow(10,22) / 2

    // moon.velocity.magnitude = 1000
    let minD = 9e91 * (1 / moon.density * moon.mass / 4) + (1 / earth.density * earth.mass / 4)
    console.log(minD);
    
    // let minD = 384 * Math.pow(10, 80)
    moon.pos = new Vector(minD, Math.PI / 2)
    moon.posInitial.magnitude = moon.pos.magnitude
    moon.posInitial.direction = moon.pos.direction
    // moon.velocity.magnitude = 1000

    let objs:Obj[] = [earth, moon]
    
    console.log(objs);
    return objs
}