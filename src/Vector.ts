import Coordinate from "./Coordinate";

export default class Vector {
    magnitude: number;
    direction: number;

    // direction is in radians
    constructor(m: number, d: number) {
        this.magnitude = m;
        this.direction = d;
    }

    update(nVector: Vector): void {
        this.direction = nVector.direction;
        this.magnitude = nVector.magnitude;
    }


    toString(): string {
        return `<${this.magnitude}, ${this.direction}>`
    }

    // returns a unit vector
    // maintains direction but has a magnitude of 1
    unit(): Vector {
        return new Vector(1, this.direction)
    }

    // returns a new vector with its magnitude multiplied by s
    multiplyByScalar(s: number): Vector {
        return new Vector(this.magnitude * s, this.direction)
    }

    // returns a new vector with its magnitude multiplied by s
    power(p: number): Vector {
        return new Vector(Math.pow(this.magnitude, p), this.direction)
    }

    // returns the X component of the vector
    getXComponent(): number {
        return this.magnitude * Math.cos(this.direction)
    }

    // returns the Y component of the vector
    getYComponent(): number {
        return this.magnitude * Math.sin(this.direction)
    }


    // is the magnitude 0 or Nan?
    isNull(): boolean {
        return this.magnitude == 0
    }

    isNaN(): boolean {
        return Number.isNaN(this.magnitude)

    }

    // TODO: innefictient.
    equals(v2: Vector, roundTo: number=4): boolean {
        return v2.magnitude.toFixed(roundTo) == this.magnitude.toFixed(roundTo) && v2.direction.toFixed(roundTo) == this.direction.toFixed(roundTo)
    }

    // returns a new vector but pointing in the other direction
    negative(): Vector {
        return new Vector(this.magnitude, this.direction + Math.PI)
    }

    // adds two vectors, with the magnitude of b being multiplied by scale
    static Add(a: Vector, b: Vector, scale: number = 1): Vector {
        if (a.isNull() || a.isNaN()) {
            return b;
        } else if (b.isNull() || b.isNaN()) {
            return a;
        }

        var xComponent = a.getXComponent() + b.getXComponent() * scale
        var yComponent = a.getYComponent() + b.getYComponent() * scale
        var combined = Math.sqrt(Math.pow(xComponent, 2) + Math.pow(yComponent, 2))
        var dir = Math.atan2(yComponent, xComponent);

        return new Vector(combined, dir);
    }

    // subtracts two vectors, with the magnitude of b being multiplied by scale
    static Subtract(a: Vector, b: Vector, scale: number = 1): Vector {
        return Vector.Add(a, b.negative(), scale)
    }

    static DotProduct(a: Vector, b: Vector): number {
        let theta = Vector.Subtract(a, b).direction
        return a.magnitude * b.magnitude * Math.cos(theta)
    }

    static CrossProduct(a, b) {
        /// TODO: make this function
    }

    // converts a Coord into a vector, relative to relativeTo
    static FromCoord(coord: Coordinate, relativeTo = new Coordinate(0, 0)): Vector {
        var dir = Math.atan2((coord.y - relativeTo.y), (coord.x - relativeTo.x)) || 0
        var mag = Math.sqrt(Math.pow(coord.y - relativeTo.y, 2) + Math.pow(coord.x - relativeTo.x, 2))
 
        return new Vector(mag, dir);
    }
}

 