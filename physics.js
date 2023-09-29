

// a coordinate in the XY plane
class Coord {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // converts a Vector into a coordinate
    static FromVector(vector) {
        return new Coord(vector.getXComponent(), vector.getYComponent())
    }
}

// vectors
class Vector {
    // direction is in radians
    constructor(magnitude, direction) {
        this.magnitude = magnitude;
        this.direction = direction;
    }


    toString() {
        return `<${this.magnitude}, ${this.direction}>`
    }

    // returns a unit vector
    // maintains direction but has a magnitude of 1
    unit() {
        return new Vector(1, this.direction)
    }

    // returns a new vector with its magnitude multiplied by s
    multiplyByScalar(s) {
        return new Vector(this.magnitude * s, this.direction)
    }

    // returns a new vector with its magnitude multiplied by s
    power(p) {
        return new Vector(Math.pow(this.magnitude, p), this.direction)
    }

    // returns the vector but the direction is in degrees instead of radians
    toDegrees() {
        return new Vector(Math.floor(this.magnitude), Math.floor(this.direction * 180 / Math.PI)).toString()
    }

    // returns the vector but the direction is in radians instead of degrees
    toRadians() {
        return new Vector(Math.floor(this.magnitude), Math.floor(this.direction / 180 * Math.PI)).toString()
    }

    // returns the X component of the vector
    getXComponent() {
        return this.magnitude * Math.cos(this.direction)
    }

    // returns the Y component of the vector
    getYComponent() {
        return this.magnitude * Math.sin(this.direction)
    }

    // is the magnitude 0?
    isNull() {
        return this.magnitude == 0
    }

    // returns a new vector but pointing in the other direction
    negative() {
        return new Vector(this.magnitude, this.direction + Math.PI)
    }

    // adds two vectors, with the magnitude of b being multiplied by scale
    static Add(a, b, scale = 1) {
        if (a.isNull()) {
            return b;
        } else if (b.isNull()) {
            return a;
        }

        var xComponent = a.getXComponent() + b.getXComponent() * scale
        var yComponent = a.getYComponent() + b.getYComponent() * scale
        var combined = Math.sqrt(Math.pow(xComponent, 2) + Math.pow(yComponent, 2))
        var dir = Math.atan2(yComponent, xComponent);

        return new Vector(combined, dir);
    }

    // subtracts two vectors, with the magnitude of b being multiplied by scale
    static Subtract(a, b, scale = 1) {
        return Vector.Add(a, b.negative(), scale)
    }

    // converts a Coord into a vector, relative to relativeTo
    static FromCoord(coord, relativeTo = new Coord(0, 0)) {
        var dir = Math.atan2((coord.y - relativeTo.y), (coord.x - relativeTo.x)) || 0
        var mag = Math.sqrt(Math.pow(coord.y - relativeTo.y, 2) + Math.pow(coord.x - relativeTo.x, 2))

        return new Vector(mag, dir)
    }
}

// an object in the world
class Obj {
    constructor(color, initialPosVector, inititalVelocity, initialAcceleration, mass = 1, jerk = new Vector(0, 0)) {
        // the color of the object
        this.color = color
        // the mass of the object
        this.mass = mass
        // the change in acceleration of the object {Vector}
        this.jerk = jerk
        // the position of the object {Vector}
        this.pos = initialPosVector
        // the velocity of the object {Vector}
        this.v = inititalVelocity
        // the acceleration of the object {Vector}
        this.a = initialAcceleration
    }

    // updates the acceleration, velocity, & position of the object with respect to delta time
    update(dt) {
        this.a = Vector.Add(this.a, this.jerk, dt)
        this.v = Vector.Add(this.v, this.a, dt)
        this.pos = Vector.Add(this.pos, this.v, dt);
    }

    // draws the object and other information on the screen
    render(dt) {
        var { x, y } = Coord.FromVector(this.pos)
        drawObj(this)

        drawVector(this.v.multiplyByScalar(25), "green", this.pos)
        drawVector(this.a.multiplyByScalar(125), "red", this.pos)
    }
}

// the first object and its parameters
var pos = Vector.FromCoord(new Coord(400, 1000))
var vel = new Vector(0, 0 * Math.PI / 180)
var acc = Vector.FromCoord(new Coord(0, 0))
var testObj = new Obj("blue", pos, vel, acc, 50)

// the second object and its parameters
var pos2 = Vector.FromCoord(new Coord(400, 300))
var vel2 = new Vector(20, 190 * Math.PI / 180)
var acc2 = Vector.FromCoord(new Coord(0, 0))
var testObj2 = new Obj("purple", pos2, vel2, acc2, 300)


// world settings:

// the gravitational constant should be 10x10^-11, but that is not strong enough here
// larger values mean more gravity in the universe
var G = 6.6743 * Math.pow(10, .5)
// framerate
const fps = 1000 / 60;
// deltatime
let dt = 0;
// for calculating dt
let lastTime = performance.now();
// speed of the world
var speed = 1
// the position of the mouse
let mouseVector;
window.addEventListener("load", () => mouseVector = globalOriginVector)

window.onload = () => {
    // the game loop
    setInterval(() => {
        // reset the transformation
        c.setTransform(1, 0, 0, 1, 0, 0);
        // clear the screen every frame
        c.clearRect(0, 0, canvas.width, canvas.height)
        // draw the grid
        drawGrid(100)
        // calculate delta time
        time = performance.now()
        dt = (time - lastTime) / fps * speed

        // update and render the objects
        testObj.update(dt)
        testObj.render(dt)
        testObj2.update(dt)
        testObj2.render(dt)

        // calculate the gravity of both objects
        var gravityVector = Vector.Subtract(testObj.pos, testObj2.pos).unit()
        gravityVector.magnitude = G * ((testObj.mass * testObj2.mass) / Vector.Subtract(testObj.pos, testObj2.pos).power(2).magnitude)
        testObj.a = gravityVector.negative()
        testObj2.a = gravityVector

        // keypresses:
        if (keysPressed.indexOf("ArrowUp") >= 0) {
            viewCoords.y += 15 * dt
        } else if (keysPressed.indexOf("ArrowDown") >= 0) {
            viewCoords.y -= 15 * dt
        } else if (keysPressed.indexOf("ArrowLeft") >= 0) {
            viewCoords.x -= 15 * dt
        } else if (keysPressed.indexOf("ArrowRight") >= 0) {
            viewCoords.x += 15 * dt
        }

        // for calculating delta time
        lastTime = time
    }, fps)
}

// to monitor which keys are pressed
var keysPressed = []
window.addEventListener("keydown", (e) => {
    if (keysPressed.indexOf(e.key) == -1) {
        keysPressed.push(e.key)
    }
})

window.addEventListener("keyup", (e) => {
    if (keysPressed.indexOf(e.key) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.key), 1)
    }
})

// when the mouse is moved, update the mouseVector
window.onmousemove = (e) => {
    mouseVector = Vector.FromCoord(new Coord(e.clientX, window.innerHeight - e.clientY))
}