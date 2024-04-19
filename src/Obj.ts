// an object in the world
import Coordinate from "./Coordinate";
import { drawObj } from "./Render";
import Vector from "./Vector";

// contains every attribute an object could have, then children of this class can have their own properties.
export default class Obj {
    color: string;
    // kg
    mass: number = 0;
    // m,m
    posInitial: Vector = new Vector(0, 0);
    // m,m
    pos: Vector = new Vector(0, 0);
    // m,m
    lastPos: Vector = new Vector(0, 0);
    // m/s
    velocity: Vector = new Vector(0, 0);
    // m,s^2
    acceleration: Vector = new Vector(0, 0);
    // m
    distance: number = 0;

    locked: boolean;
    // kg/m
    density: number = 1;
    theta: number = 0;
    omega: number = 0;
    alpha: number = 0;
    // the charge of a particle, measured in coulumbs
    charge: number = 0;

    kineticFrictionCoefficient: number = 0;
    staticFrictionCoefficient: number = 0;


    constructor(color?: string, initialPosVector?: Vector, inititalVelocity?: Vector, initialAcceleration?: Vector, mass?: number) {
        // the color of the object
        this.color = color ?? "black"
        // the mass of the object
        this.mass = mass ?? 1000
        // the initial position (for calculating displacement)
        this.posInitial = initialPosVector ?? new Vector(0, 0)
        // the position of the object {Vector}
        this.pos = initialPosVector ?? new Vector(0, 0)
        // the last position (for calculating delta distance)
        this.lastPos = initialPosVector ?? new Vector(0, 0)
        // the velocity of the object {Vector}
        this.velocity = inititalVelocity ?? new Vector(0, 0)
        // the acceleration of the object {Vector}
        this.acceleration = initialAcceleration ?? new Vector(0, 0)
        // the amount of total distance traveled:
        this.distance = 0
        // fixes the position of an object in space
        this.locked = false
        // for rotations:
        // the rotation of the object, relative to its center of mass
        // angular acceleration, angular velocity, and angular pos
        // all measured in radians/sec
        this.theta = 0
        this.omega = 0
        this.alpha = 0

    }

    volume() {
        return this.mass / this.density
    }

    radius() {
        return Math.pow((3/(4 * Math.PI)) * this.volume(), 1/3)
    }

    // sets the displacement to zero.
    resetDisplacement() {
        this.posInitial = this.pos;
    }

    // gets its displacement
    displacement() {
        return Vector.Subtract(this.pos, this.posInitial)
    }

    // returns the kinetic energy of the object
    kineticEnergy() {
        return .5 * this.mass * Math.pow(this.velocity.magnitude, 2)
    }

    momentum() {
        return this.velocity.multiplyByScalar(this.mass)
    }

    // updates the acceleration, velocity, & position of the object with respect to delta time
    // calculates the acceleration on the object from all of the forces
    update(dt) {
        if (this.locked) {
            return
        }

        this.lastPos = this.pos

        this.velocity = Vector.Add(this.velocity, this.acceleration, dt);
        this.pos = Vector.Add(this.pos, this.velocity, dt);
        
        // for rotational motion,
        this.omega += this.alpha * dt
        this.theta += this.omega * dt

        // add to the total distance of the object how much it is traveling.
        this.distance += this.velocity.magnitude * dt;
    }
 
    // draws the object and other information on the screen
    render() {
        drawObj(this)
    }
}