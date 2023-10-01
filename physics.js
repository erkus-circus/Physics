

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

    static DistanceFrom(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
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

    // is the magnitude 0 or Nan?
    isNull() {
        return this.magnitude == 0
    }

    isNaN() {
        return Number.isNaN(this.magnitude)

    }

    // returns a new vector but pointing in the other direction
    negative() {
        return new Vector(this.magnitude, this.direction + Math.PI)
    }

    // adds two vectors, with the magnitude of b being multiplied by scale
    static Add(a, b, scale = 1) {
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
    static Subtract(a, b, scale = 1) {
        return Vector.Add(a, b.negative(), scale)
    }

    static DotProduct(a, b) {
        let theta = Vector.Subtract(a, b).direction
        return a.magnitude * b.magnitude * Math.cos(theta)
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
    }
}

// all of the objects in the universe
var objects = []



// world settings:

// the gravitational constant should be 10x10^-11, but that is not strong enough here
// larger values mean more gravity in the universe
var G = 6.6743 * Math.pow(10, -3)
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
// the size of each new ball to be spawned
let size = 1000
// the initial velocity settings for a new ball
let initialVelocity = new Vector(0, 0)
// the scale of the canvas
let scale = 1
// the speed at which the user is able to scroll using the arrow keys
let scrollSpeed = 20

window.addEventListener("load", () => mouseVector = globalOriginVector)

window.onload = () => {
    // the game loop
    setInterval(() => {

        // reset the transformation
        c.setTransform(1, 0, 0, 1, 0, 0);
        // clear the screen every frame
        c.clearRect(0, 0, canvas.width, canvas.height)
        // draw the grid
        drawGrid(50)

        // calculate delta time
        time = performance.now()
        dt = (time - lastTime) / fps * speed
        if (speed != 0) {


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
                    gravityVector.magnitude = G * ((objects[i].mass * objects[j].mass) / Vector.Subtract(objects[i].pos, objects[j].pos).power(2).magnitude)
                    // drawVector(gravityVector.multiplyByScalar(500), "red", objects[i].pos)
                    // detect collision:
                    // first get positions of both objects in the coordinate plane
                    let obj1Pos = Coord.FromVector(objects[i].pos)
                    let obj2Pos = Coord.FromVector(objects[j].pos)
                    // second, get the distance between both of the points
                    let d = Coord.DistanceFrom(obj1Pos, obj2Pos)
                    // the maximum distance is both of the objects radiuses
                    let maxD = Math.sqrt(objects[i].mass / Math.PI) + Math.sqrt(objects[j].mass / Math.PI)

                    if (d <= maxD && objects[i].mass <= objects[j].mass) {
                        // switch direction
                        // TODO: is this correct? should the direction be accounted for in here?
                        if (objects[i].v.magnitude > 40 || objects[j].v.magnitude > 40 || d + .1 * Math.sqrt(objects[j].mass / Math.PI) <= maxD) {
                            objects[j].mass += objects[i].mass
                            objects[j].v.magnitude = 0
                            objects[i].mass = 0
                            continue
                        }
                        continue
                    } else {
                        totalAcceleration = Vector.Add(totalAcceleration, gravityVector.negative())
                    }

                }

                // set the final gravity
                objects[i].a = totalAcceleration.multiplyByScalar(1 / objects[i].mass).negative()
                drawVector(totalAcceleration.negative().multiplyByScalar(100), "red", objects[i].pos)
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
         * L: Increase gravity (by magnitudes of 10)
         * L: Decrease gravity (by magnitudes of 10)
         * D: Scale screen up
         * S: Scale screen down
         * G: Increase scroll speed
         * F: Decrease scroll speed
         */
        // keypresses:
        if (keysPressed.indexOf("ArrowUp") >= 0) {
            viewCoords.y += scrollSpeed
        }
        if (keysPressed.indexOf("ArrowDown") >= 0) {
            viewCoords.y -= scrollSpeed
        }
        if (keysPressed.indexOf("ArrowLeft") >= 0) {
            viewCoords.x += scrollSpeed
        }
        if (keysPressed.indexOf("ArrowRight") >= 0) {
            viewCoords.x -= scrollSpeed
        }
        if (keysPressed.indexOf("KeyM") >= 0) {
            size *= 1.06
        }
        if (keysPressed.indexOf("KeyN") >= 0) {
            size /= 1.06
        }
        if (keysPressed.indexOf("Equal") >= 0) {
            if (!initialVelocity.magnitude) {
                initialVelocity.magnitude += 1
            }
            initialVelocity.magnitude *= 1.04
        }
        if (keysPressed.indexOf("Minus") >= 0) {
            initialVelocity.magnitude /= 1.04
        }
        if (keysPressed.indexOf("KeyZ") >= 0) {
            initialVelocity.direction += .05
        }
        if (keysPressed.indexOf("KeyX") >= 0) {
            initialVelocity.direction -= .05
        }
        if (keysPressed.indexOf(" ") >= 0) {
            speed = !speed
            // so it doesnt randomly unpause
            keysPressed.splice(keysPressed.indexOf(" "), 1)
        }
        if (keysPressed.indexOf("KeyL") >= 0) {
            G *= 2
            // so it doesnt randomly unpause
            keysPressed.splice(keysPressed.indexOf("KeyL"), 1)
        }
        if (keysPressed.indexOf("KeyK") >= 0) {
            G /= 2
            // so it doesnt randomly unpause
            keysPressed.splice(keysPressed.indexOf("KeyK"), 1)
        }
        if (keysPressed.indexOf("KeyD") >= 0) {
            scale *= 1.1
        }
        if (keysPressed.indexOf("KeyS") >= 0) {
            scale *= 1.1
        }
        if (keysPressed.indexOf("KeyG") >= 0) {
            scrollSpeed *= 1.04
        }
        if (keysPressed.indexOf("KeyF") >= 0) {
            scrollSpeed /= 1.04
        }
        
        

        objects.forEach((obj) => {
            obj.render(dt)
        })

        // render the mouse circle
        renderMouse(mouseVector, initialVelocity)

        // for calculating delta time
        lastTime = time
    }, fps)
}




// to monitor which keys are pressed
var keysPressed = []
window.addEventListener("keydown", (e) => {
    if (keysPressed.indexOf(e.key) == -1) {
        keysPressed.push(e.key)
        keysPressed.push(e.code)
    }
})

window.addEventListener("keyup", (e) => {
    if (keysPressed.indexOf(e.key) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.key), 1)
    }
    if (keysPressed.indexOf(e.code) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.code), 1)
    }

    if (e.key == "Space") {
        speed = !speed
    }
})

// when the mouse is moved, update the mouseVector
window.onmousemove = (e) => {
    viewCoords.x *= -1
    mouseVector = Vector.Add(Vector.FromCoord(new Coord(e.clientX, window.innerHeight - e.clientY)), Vector.FromCoord(viewCoords))
    viewCoords.x *= -1
}

window.onclick = (e) => {
    var newObj = new Obj("black", mouseVector, initialVelocity.negative().negative(), new Vector(0, 0), size)
    objects.push(newObj)
}