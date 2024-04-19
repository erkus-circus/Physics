import Coordinate from "../Coordinate"
import { objects } from "../Main"
import Obj from "../Obj"
import Vector from "../Vector"

export var controls = {
    Object: {
        Mass: {
            type: "number",
            // measured in 
            units: "kg",
            // earths mass
            // value: 5.972 * Math.pow(10, 24),
            value: 1
        },
        Velocity: {
            type: "vector",
            // measured in 
            units: "m/s",
            magnitude: 0,
            direction: 0
        },
        Density: {
            type: "number",
            // measured in 
            units: "kg/m^2",
            value: 1
        },
        Position: {
            type: "coordinates",
            // measured in 
            x: 0,
            y: 0
        },
        Theta: {
            type: "number",
            units: "rad",
            value: 0
        },
        Omega: {
            type: "number",
            units: "rad/s",
            value: 0
        },
        Alpha: {
            type: "number",
            units: "rad/s^2",
            value: 0
        },
        Charge: {
            type: "number",
            units: "C",
            value: 0
        },
        Placing: {
            type: "bool",
            value: true
        },
        Place: {
            type: "button",
            action: () => {
                var newObj = new Obj("gray", Vector.FromCoord(new Coordinate(controls.Object.Position.x, controls.Object.Position.y)), new Vector(controls["Object"]["Velocity"].magnitude, controls["Object"]["Velocity"].direction * Math.PI / 180), new Vector(0, 0), controls["Object"]["Mass"]["value"])
                newObj.density = controls.Object.Density.value
                newObj.theta = controls.Object.Theta.value
                newObj.omega = controls.Object.Omega.value
                newObj.alpha = controls.Object.Alpha.value
                objects.push(newObj)
            }
        }
    },
    System: {
        Gravity: {
            type: "number",
            units: "m/s^2",
            value: 6.6743 * Math.pow(10, -11)
        },
        Permeability_Constant: {
            type: "number",
            units: "",
            value: 8.854187817e-12
        },
        Simulation_Speed: {
            type: "number",
            units: "s",
            value: 1
        },
        Paused: {
            type: "bool",
            value: false
        },
        Elastic_Collisions: {
            type: "bool",
            value: false
        }
    },
    View: {
        Zoom: {
            type: "number",
            units: "m^2",
            value: 100
        },
        View_Coordinates: {
            type: "coordinates",
            x: 0,
            y: 0,
            z: 0
        },
        Scroll_Speed: {
            type: "number",
            units: "m/s",
            value: 1
        },
        Grid: {
            type: "bool",
            value: true
        },
        Show_Velocity_Vector: {
            type: "bool",
            value: true
        },
        Show_Acceleration_Vector: {
            type: "bool",
            value: false
        }
    }
}