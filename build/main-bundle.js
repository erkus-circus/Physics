/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Controller.ts":
/*!***************************!*\
  !*** ./src/Controller.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Eric Diskin
 * Nov 17, 2023
 * Controller:
 *  An overlay that contains information on the world and contains controls for the system and its objects
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateControl = void 0;
var controls_1 = __webpack_require__(/*! ./Gravity/controls */ "./src/Gravity/controls.ts");
// for the movement of the controller box.
// only called once, when the window is loaded.
function configureControllerBox() {
    /// The movement of the box
    var sel = document.getElementsByClassName("selector-box-main")[0];
    // sets to true when the box is being dragged.
    var movingControllerBox = false;
    // set its position to the middle ish of the screen
    sel.style.left = window.innerWidth / 5 + "px";
    sel.style.top = window.innerHeight / 5 + "px";
    // when the mouse is down & its target is the box, move it.
    sel.onmousedown = function (e) {
        if (e.target === sel) {
            movingControllerBox = true;
        }
    };
    sel.addEventListener("dblclick", function (e) {
        if (e.target === sel) {
            // toggle the visibility of the controller box.
            Array.from(sel.children).forEach(function (c) {
                c.style.display = c.style.display == "block" ? "none" : "block";
            });
        }
    });
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
    var _loop_1 = function (p) {
        // the properties this page contains
        var page = controls_1.controls[p];
        // the page itself
        var pageDiv = document.createElement("DIV");
        pageDiv.className = "page-outline page selector-box-content-menu hidden";
        pageDiv.id = "selector-box-page-" + p;
        // create the title of the content menu page.
        var pageTitle = document.createElement("SPAN");
        pageTitle.className = "selector-box-title";
        pageTitle.innerHTML = p;
        pageDiv.append(pageTitle);
        var _loop_2 = function (ctrl) {
            // create the container for the input:
            inputContainer = document.createElement("SPAN");
            inputContainer.className = "selector-input";
            inputContainer.innerText = ctrl;
            // if the control is a number:
            if (page[ctrl].type === "number") {
                var inputEl_1 = document.createElement("INPUT");
                // set the type of the input.
                inputEl_1.className = "selector-box-input";
                inputEl_1.style.display = "inline";
                inputEl_1.type = "number";
                inputEl_1.value = page[ctrl].value;
                inputEl_1.id = "controls.".concat(p, ".").concat(ctrl);
                // events
                inputEl_1.addEventListener("keypress", function (e) {
                    // change the value of the control.
                    if (e.target instanceof Element) {
                        //@ts-ignore
                        controls_1.controls[p][ctrl].value = Number.parseFloat(e.target.value);
                    }
                });
                inputEl_1.addEventListener("change", function (e) {
                    // change the value of the control.
                    controls_1.controls[p][ctrl].value = Number.parseFloat(inputEl_1.value);
                });
                inputContainer.append(inputEl_1);
            }
            else if (page[ctrl].type === "coordinates") {
                var inputElX = document.createElement("INPUT");
                // set the type of the input.
                inputElX.className = "selector-box-input";
                inputElX.style.display = "inline";
                inputElX.type = "number";
                inputElX.value = page[ctrl].x;
                // events
                inputElX.addEventListener("keypress", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].x = e.target.value;
                });
                inputElX.addEventListener("change", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].x = e.target.value;
                });
                var inputElY = document.createElement("INPUT");
                // set the type of the input.
                inputElY.className = "selector-box-input";
                inputElY.style.display = "inline";
                inputElY.type = "number";
                inputElY.value = page[ctrl].y;
                inputElY.addEventListener("keypress", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].y = e.target.value;
                });
                inputElY.addEventListener("change", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].y = e.target.value;
                });
                inputContainer.append(inputElX, inputElY);
            }
            else if (page[ctrl].type === "vector") {
                var inputElMag = document.createElement("INPUT");
                // set the type of the input.
                inputElMag.className = "selector-box-input";
                inputElMag.style.display = "inline";
                inputElMag.type = "number";
                inputElMag.value = page[ctrl].magnitude;
                // events
                inputElMag.addEventListener("keypress", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].magnitude = e.target.value;
                });
                inputElMag.addEventListener("change", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].magnitude = e.target.value;
                });
                var inputElDir = document.createElement("INPUT");
                // set the type of the input.
                inputElDir.className = "selector-box-input";
                inputElDir.style.display = "inline";
                inputElDir.type = "number";
                inputElDir.value = page[ctrl].direction;
                inputElDir.addEventListener("keypress", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].direction = e.target.value;
                });
                inputElDir.addEventListener("change", function (e) {
                    // change the value of the control.
                    //@ts-ignore
                    controls_1.controls[p][ctrl].direction = e.target.value;
                });
                inputContainer.append(inputElMag, inputElDir);
            }
            else if (page[ctrl].type === "bool") {
                // fofr a checkbox/bool type of control.
                var switchContainer = document.createElement("LABEL");
                switchContainer.className = "selector-box-switch";
                var switchInput = document.createElement("INPUT");
                switchInput.type = "checkbox";
                switchInput.id = "controls.".concat(p, ".").concat(ctrl);
                switchInput.className = "selector-box-input hidden";
                switchInput.checked = controls_1.controls[p][ctrl].value;
                var switchSlider = document.createElement("SPAN");
                switchSlider.className = "selector-box-slider";
                // the events for the input
                switchInput.addEventListener("change", function (e) {
                    controls_1.controls[p][ctrl].value = !controls_1.controls[p][ctrl].value;
                });
                switchContainer.append(switchInput, switchSlider);
                inputContainer.append(switchContainer);
            }
            else if (page[ctrl].type === "button") {
                // fofr a checkbox/bool type of control.
                var button = document.createElement("BUTTON");
                button.className = "selector-box-btn";
                button.id = "controls.".concat(p, ".").concat(ctrl);
                button.innerHTML = "Click";
                // the events for the input
                button.addEventListener("click", function (e) {
                    try {
                        controls_1.controls[p][ctrl].action();
                    }
                    catch (error) {
                        console.error(error);
                    }
                });
                inputContainer.append(button);
            }
            pageDiv.append(inputContainer);
        };
        // now, create all the inputs and their events.
        for (var ctrl in page) {
            _loop_2(ctrl);
        }
        document.getElementsByClassName("selector-box-menu")[0].append(pageDiv);
    };
    var inputContainer;
    /// creating the panels
    // the controls variable contains the data for the objects.
    for (var _i = 0, _a = Object.keys(controls_1.controls); _i < _a.length; _i++) {
        var p = _a[_i];
        _loop_1(p);
    }
    /// Selecting and changing panels.
    // each .selector-box-section will show its panel and become selected when it is clicked.
    var panelButtons = document.getElementsByClassName("selector-box-section");
    Array.from(panelButtons).forEach(function (el) {
        el.addEventListener("click", function (e) {
            // make the other buttons deselected, 
            Array.from(panelButtons).forEach(function (el2) { return el2.classList.remove("btn-selected"); });
            // then select this box.
            el.classList.add("btn-selected");
            // hide every other panel
            Array.from(document.getElementsByClassName("selector-box-content-menu")).forEach(function (element) {
                element.classList.add("hidden");
            });
            // next, extract the name of the panel and show it.
            document.getElementById("selector-box-page-" + el.id.split("-").pop()).classList.remove("hidden");
        });
    });
}
exports["default"] = configureControllerBox;
function updateControl(location, value) {
    var l = location.split(".").reduce(function (pv, cv) { return pv[cv]; }, controls_1.controls);
    if (l.type == "number" || l.type == "bool") {
        //@ts-ignore
        document.getElementById("controls." + location).value = value;
        //@ts-ignore
        document.getElementById("controls." + location).checked = value;
        document.getElementById("controls." + location).dispatchEvent(new Event('change'));
    }
    else if (l.type === "coordinates") {
    }
}
exports.updateControl = updateControl;


/***/ }),

/***/ "./src/Coordinate.ts":
/*!***************************!*\
  !*** ./src/Coordinate.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Coordinate = /** @class */ (function () {
    function Coordinate(X, Y, Z) {
        this.x = X;
        this.y = Y;
        this.z = Z !== null && Z !== void 0 ? Z : 0;
    }
    Coordinate.FromVector = function (v) {
        return new Coordinate(v.getXComponent(), v.getYComponent());
    };
    Coordinate.DistanceFrom = function (a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    };
    return Coordinate;
}());
exports["default"] = Coordinate;


/***/ }),

/***/ "./src/Gravity/controls.ts":
/*!*********************************!*\
  !*** ./src/Gravity/controls.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.controls = void 0;
var Coordinate_1 = __webpack_require__(/*! ../Coordinate */ "./src/Coordinate.ts");
var Main_1 = __webpack_require__(/*! ../Main */ "./src/Main.ts");
var Obj_1 = __webpack_require__(/*! ../Obj */ "./src/Obj.ts");
var Vector_1 = __webpack_require__(/*! ../Vector */ "./src/Vector.ts");
exports.controls = {
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
            action: function () {
                var newObj = new Obj_1.default("gray", Vector_1.default.FromCoord(new Coordinate_1.default(exports.controls.Object.Position.x, exports.controls.Object.Position.y)), new Vector_1.default(exports.controls["Object"]["Velocity"].magnitude, exports.controls["Object"]["Velocity"].direction * Math.PI / 180), new Vector_1.default(0, 0), exports.controls["Object"]["Mass"]["value"]);
                newObj.density = exports.controls.Object.Density.value;
                newObj.theta = exports.controls.Object.Theta.value;
                newObj.omega = exports.controls.Object.Omega.value;
                newObj.alpha = exports.controls.Object.Alpha.value;
                Main_1.objects.push(newObj);
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
};


/***/ }),

/***/ "./src/Gravity/gravity.ts":
/*!********************************!*\
  !*** ./src/Gravity/gravity.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Controller_1 = __webpack_require__(/*! ../Controller */ "./src/Controller.ts");
var Coordinate_1 = __webpack_require__(/*! ../Coordinate */ "./src/Coordinate.ts");
var Main_1 = __webpack_require__(/*! ../Main */ "./src/Main.ts");
var Obj_1 = __webpack_require__(/*! ../Obj */ "./src/Obj.ts");
var Render_1 = __webpack_require__(/*! ../Render */ "./src/Render.ts");
var Vector_1 = __webpack_require__(/*! ../Vector */ "./src/Vector.ts");
var controls_1 = __webpack_require__(/*! ./controls */ "./src/Gravity/controls.ts");
var gravity = true;
// the speed at which the user is able to scroll using the arrow keys
var scrollSpeed = 20;
// deltatime (measured in what units?)
var dt = 0;
// for calculating dt
var lastTime = performance.now();
var frame = 0;
function nthFrame(func, fno) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(frame % fno === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, func()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function Initialize() {
    // the game loop
    setInterval(function () {
        try {
            // console.log(objects);
        }
        catch (er) {
        }
        frame++;
        (0, Render_1.clearCanvas)();
        // draw the grid
        (0, Render_1.drawGrid)();
        // calculate delta time
        var time = performance.now();
        dt = (time - lastTime) / Main_1.fps * controls_1.controls.System.Simulation_Speed.value;
        if (!controls_1.controls.System.Paused.value) {
            // update and render the objects
            Main_1.objects.forEach(function (obj, i) {
                if (obj.mass <= 0) {
                    Main_1.objects.splice(i, 1);
                }
                obj.update(dt);
            });
            // calculate the gravity of all objects
            for (var i = 0; i < Main_1.objects.length; i++) {
                var totalAcceleration = new Vector_1.default(0, 0);
                for (var j = 0; j < Main_1.objects.length; j++) {
                    // an object compared with itself has infinite gravity
                    if (i == j) {
                        continue;
                    }
                    // calculate the gravity of each object towards each other one
                    var gravityVector = Vector_1.default.Subtract(Main_1.objects[j].pos, Main_1.objects[i].pos);
                    gravityVector.magnitude = controls_1.controls.System.Gravity.value * ((Main_1.objects[i].mass * Main_1.objects[j].mass) / Vector_1.default.Subtract(Main_1.objects[i].pos, Main_1.objects[j].pos).power(2).magnitude);
                    // calculate the force of electric charge 
                    var eforceVector = Vector_1.default.Subtract(Main_1.objects[j].pos, Main_1.objects[i].pos);
                    eforceVector.magnitude = (1 / (4 * Math.PI * controls_1.controls.System.Permeability_Constant.value)) * ((Main_1.objects[i].charge * Main_1.objects[j].charge) / Vector_1.default.Subtract(Main_1.objects[i].pos, Main_1.objects[j].pos).power(2).magnitude);
                    // drawVector(gravityVector.multiplyByScalar(500), "red", objects[i].pos)
                    // detect collision:
                    // first get positions of both objects in the coordinate plane
                    var obj1Pos = Coordinate_1.default.FromVector(Main_1.objects[i].pos);
                    var obj2Pos = Coordinate_1.default.FromVector(Main_1.objects[j].pos);
                    // second, get the distance between both of the points
                    var d = Coordinate_1.default.DistanceFrom(obj1Pos, obj2Pos);
                    // the maximum distance is both of the objects radiuses summed
                    // let maxD = Math.sqrt(objects[i].mass / (Math.PI * objects[i].density)) + Math.sqrt(objects[j].mass / (Math.PI * objects[j].density))
                    var maxD = Main_1.objects[i].radius() + Main_1.objects[j].radius();
                    if ((!controls_1.controls.System.Elastic_Collisions.value && d <= maxD) && Main_1.objects[i].mass <= Main_1.objects[j].mass) {
                        // perfectly inelastic collisions:
                        Main_1.objects[j].velocity = Vector_1.default.Add(Main_1.objects[i].velocity.multiplyByScalar(Main_1.objects[i].mass), (Main_1.objects[j].velocity.multiplyByScalar(Main_1.objects[j].mass))).multiplyByScalar(1 / (Main_1.objects[i].mass + Main_1.objects[j].mass));
                        // the locked property is dominant
                        Main_1.objects[j].locked = Main_1.objects[j].locked || Main_1.objects[i].locked;
                        Main_1.objects[j].mass += Main_1.objects[i].mass;
                        Main_1.objects[j].charge += Main_1.objects[i].charge;
                        Main_1.objects[i].mass = 0;
                        continue;
                    }
                    if (controls_1.controls.System.Elastic_Collisions.value && d <= maxD && Main_1.objects[i].mass <= Main_1.objects[j].mass && Main_1.objects[i].distance > Main_1.objects[j].distance) {
                        var tempVm = Main_1.objects[i].velocity.magnitude;
                        var tempVd = Main_1.objects[i].velocity.direction;
                        // m1v1=m2v2 ==> v = m1v/m2
                        Main_1.objects[i].velocity = Main_1.objects[j].velocity.multiplyByScalar(Main_1.objects[j].mass / Main_1.objects[i].mass);
                        Main_1.objects[j].velocity = new Vector_1.default(tempVm, tempVd).multiplyByScalar(Main_1.objects[i].mass / Main_1.objects[j].mass);
                    }
                    else {
                        totalAcceleration = Vector_1.default.Add(totalAcceleration, gravityVector.negative());
                        totalAcceleration = Vector_1.default.Add(totalAcceleration, eforceVector);
                    }
                }
                // set the final gravity
                Main_1.objects[i].acceleration = totalAcceleration.multiplyByScalar(1 / Main_1.objects[i].mass);
                if (gravity)
                    Main_1.objects[i].acceleration = Main_1.objects[i].acceleration.negative();
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
            controls_1.controls.View.View_Coordinates.y += scrollSpeed;
            var a = Coordinate_1.default.FromVector(Main_1.mouseVector);
            a.y += scrollSpeed;
            Main_1.mouseVector.update(Vector_1.default.FromCoord(a));
        }
        if (keysPressed.indexOf("ArrowDown") >= 0) {
            controls_1.controls.View.View_Coordinates.y -= scrollSpeed;
            var a = Coordinate_1.default.FromVector(Main_1.mouseVector);
            a.y -= scrollSpeed;
            Main_1.mouseVector.update(Vector_1.default.FromCoord(a));
        }
        if (keysPressed.indexOf("ArrowLeft") >= 0) {
            controls_1.controls.View.View_Coordinates.x += scrollSpeed;
            var a = Coordinate_1.default.FromVector(Main_1.mouseVector);
            a.x -= scrollSpeed;
            Main_1.mouseVector.update(Vector_1.default.FromCoord(a));
        }
        if (keysPressed.indexOf("ArrowRight") >= 0) {
            controls_1.controls.View.View_Coordinates.x -= scrollSpeed;
            var a = Coordinate_1.default.FromVector(Main_1.mouseVector);
            a.x += scrollSpeed;
            Main_1.mouseVector.update(Vector_1.default.FromCoord(a));
        }
        if (keysPressed.indexOf(" ") >= 0) {
            (0, Controller_1.updateControl)("System.Paused", !controls_1.controls.System.Paused.value);
            // so it doesnt randomly unpause
            keysPressed.splice(keysPressed.indexOf(" "), 1);
        }
        if (keysPressed.indexOf("=") >= 0) {
            var el = document.getElementById("controls.View.Zoom");
            (0, Controller_1.updateControl)("View.Zoom", parseInt(el.value) + 1 / Math.sqrt(parseInt(el.value)));
        }
        if (keysPressed.indexOf("Minus") >= 0) {
            var el = document.getElementById("controls.View.Zoom");
            (0, Controller_1.updateControl)("View.Zoom", parseInt(el.value) - 1 / Math.sqrt(parseInt(el.value)));
        }
        Main_1.objects.forEach(function (obj) {
            obj.render();
        });
        if (controls_1.controls.Object.Placing.value) {
            // render the mouse circle
            (0, Render_1.renderMouse)();
        }
        // for calculating delta time
        lastTime = time;
    }, Main_1.fps);
}
exports["default"] = Initialize;
// to monitor which keys are pressed
var keysPressed = [];
window.addEventListener("keydown", function (e) {
    //@ts-ignore
    if (e.target.tagName == "INPUT")
        return;
    if (keysPressed.indexOf(e.key) == -1) {
        keysPressed.push(e.key);
        keysPressed.push(e.code);
    }
});
window.addEventListener("keyup", function (e) {
    //@ts-ignore
    if (e.target.tagName == "INPUT")
        return;
    if (keysPressed.indexOf(e.key) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.key), 1);
    }
    if (keysPressed.indexOf(e.code) >= 0) {
        keysPressed.splice(keysPressed.indexOf(e.code), 1);
    }
    if (e.key == "Space") {
        (0, Controller_1.updateControl)("System.Paused", !controls_1.controls.System.Paused.value);
    }
});
// when the mouse is moved, update the mouseVector
window.addEventListener("mousemove", function (e) {
    controls_1.controls.View.View_Coordinates.x *= -1;
    Main_1.mouseVector.update(Vector_1.default.Add(Vector_1.default.FromCoord(new Coordinate_1.default(e.clientX / controls_1.controls.View.Zoom.value, (window.innerHeight - e.clientY) / controls_1.controls.View.Zoom.value)), Vector_1.default.FromCoord(controls_1.controls.View.View_Coordinates).multiplyByScalar(1 / controls_1.controls.View.Zoom.value)));
    controls_1.controls.View.View_Coordinates.x *= -1;
});
window.addEventListener("click", function (e) {
    if (e.target != document.getElementById("canvas") || !controls_1.controls.Object.Placing.value) {
        // only place a new block if the acnvas was clicked
        return;
    }
    // converts the direction into radians
    var newObj = new Obj_1.default("gray", Vector_1.default.FromCoord(Coordinate_1.default.FromVector(Main_1.mouseVector)), new Vector_1.default(controls_1.controls["Object"]["Velocity"].magnitude, controls_1.controls["Object"]["Velocity"].direction * Math.PI / 180), new Vector_1.default(0, 0), controls_1.controls["Object"]["Mass"]["value"]);
    newObj.density = controls_1.controls.Object.Density.value;
    newObj.theta = controls_1.controls.Object.Theta.value;
    newObj.omega = controls_1.controls.Object.Omega.value;
    newObj.alpha = controls_1.controls.Object.Alpha.value;
    newObj.charge = controls_1.controls.Object.Charge.value;
    Main_1.objects.push(newObj);
});


/***/ }),

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mouseVector = exports.fps = exports.objects = void 0;
var Controller_1 = __webpack_require__(/*! ./Controller */ "./src/Controller.ts");
var gravity_1 = __webpack_require__(/*! ./Gravity/gravity */ "./src/Gravity/gravity.ts");
var Render_1 = __webpack_require__(/*! ./Render */ "./src/Render.ts");
// all of the objects in the game
exports.objects = [];
// world settings:
// framerate
exports.fps = 1000 / 60;
window.addEventListener("load", function () { return exports.mouseVector = Render_1.globalOriginVector; });
window.addEventListener("load", gravity_1.default);
window.addEventListener("load", function () {
    (0, Controller_1.default)();
    document.getElementById("selector-box-Object").click();
});
// for simulations: 
window.addEventListener("load", function () {
    document.getElementById("clear-button").addEventListener("click", function () {
        while (exports.objects.length > 0) {
            exports.objects.pop();
        }
    });
    document.getElementById("earth-obj-button").addEventListener("click", function () {
        (0, Controller_1.updateControl)("Object.Mass", 5.997E24);
        (0, Controller_1.updateControl)("Object.Density", 5514);
        (0, Controller_1.updateControl)("Object.Omega", 0.00007292115);
        (0, Controller_1.updateControl)("View.Zoom", 1E-5);
    });
});


/***/ }),

/***/ "./src/Obj.ts":
/*!********************!*\
  !*** ./src/Obj.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Render_1 = __webpack_require__(/*! ./Render */ "./src/Render.ts");
var Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector.ts");
// contains every attribute an object could have, then children of this class can have their own properties.
var Obj = /** @class */ (function () {
    function Obj(color, initialPosVector, inititalVelocity, initialAcceleration, mass) {
        // kg
        this.mass = 0;
        // m,m
        this.posInitial = new Vector_1.default(0, 0);
        // m,m
        this.pos = new Vector_1.default(0, 0);
        // m,m
        this.lastPos = new Vector_1.default(0, 0);
        // m/s
        this.velocity = new Vector_1.default(0, 0);
        // m,s^2
        this.acceleration = new Vector_1.default(0, 0);
        // m
        this.distance = 0;
        // kg/m
        this.density = 1;
        this.theta = 0;
        this.omega = 0;
        this.alpha = 0;
        // the charge of a particle, measured in coulumbs
        this.charge = 0;
        this.kineticFrictionCoefficient = 0;
        this.staticFrictionCoefficient = 0;
        // the color of the object
        this.color = color !== null && color !== void 0 ? color : "black";
        // the mass of the object
        this.mass = mass !== null && mass !== void 0 ? mass : 1000;
        // the initial position (for calculating displacement)
        this.posInitial = initialPosVector !== null && initialPosVector !== void 0 ? initialPosVector : new Vector_1.default(0, 0);
        // the position of the object {Vector}
        this.pos = initialPosVector !== null && initialPosVector !== void 0 ? initialPosVector : new Vector_1.default(0, 0);
        // the last position (for calculating delta distance)
        this.lastPos = initialPosVector !== null && initialPosVector !== void 0 ? initialPosVector : new Vector_1.default(0, 0);
        // the velocity of the object {Vector}
        this.velocity = inititalVelocity !== null && inititalVelocity !== void 0 ? inititalVelocity : new Vector_1.default(0, 0);
        // the acceleration of the object {Vector}
        this.acceleration = initialAcceleration !== null && initialAcceleration !== void 0 ? initialAcceleration : new Vector_1.default(0, 0);
        // the amount of total distance traveled:
        this.distance = 0;
        // fixes the position of an object in space
        this.locked = false;
        // for rotations:
        // the rotation of the object, relative to its center of mass
        // angular acceleration, angular velocity, and angular pos
        // all measured in radians/sec
        this.theta = 0;
        this.omega = 0;
        this.alpha = 0;
    }
    Obj.prototype.volume = function () {
        return this.mass / this.density;
    };
    Obj.prototype.radius = function () {
        return Math.pow((3 / (4 * Math.PI)) * this.volume(), 1 / 3);
    };
    // sets the displacement to zero.
    Obj.prototype.resetDisplacement = function () {
        this.posInitial = this.pos;
    };
    // gets its displacement
    Obj.prototype.displacement = function () {
        return Vector_1.default.Subtract(this.pos, this.posInitial);
    };
    // returns the kinetic energy of the object
    Obj.prototype.kineticEnergy = function () {
        return .5 * this.mass * Math.pow(this.velocity.magnitude, 2);
    };
    Obj.prototype.momentum = function () {
        return this.velocity.multiplyByScalar(this.mass);
    };
    // updates the acceleration, velocity, & position of the object with respect to delta time
    // calculates the acceleration on the object from all of the forces
    Obj.prototype.update = function (dt) {
        if (this.locked) {
            return;
        }
        this.lastPos = this.pos;
        this.velocity = Vector_1.default.Add(this.velocity, this.acceleration, dt);
        this.pos = Vector_1.default.Add(this.pos, this.velocity, dt);
        // for rotational motion,
        this.omega += this.alpha * dt;
        this.theta += this.omega * dt;
        // add to the total distance of the object how much it is traveling.
        this.distance += this.velocity.magnitude * dt;
    };
    // draws the object and other information on the screen
    Obj.prototype.render = function () {
        (0, Render_1.drawObj)(this);
    };
    return Obj;
}());
exports["default"] = Obj;


/***/ }),

/***/ "./src/Render.ts":
/*!***********************!*\
  !*** ./src/Render.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearCanvas = exports.drawVectorStat = exports.renderMouse = exports.drawObj = exports.drawObjectStats = exports.drawVector = exports.drawPoint = exports.drawGrid = exports.globalOriginVector = void 0;
var Coordinate_1 = __webpack_require__(/*! ./Coordinate */ "./src/Coordinate.ts");
var Vector_1 = __webpack_require__(/*! ./Vector */ "./src/Vector.ts");
var controls_1 = __webpack_require__(/*! ./Gravity/controls */ "./src/Gravity/controls.ts");
var Main_1 = __webpack_require__(/*! ./Main */ "./src/Main.ts");
var Obj_1 = __webpack_require__(/*! ./Obj */ "./src/Obj.ts");
// the canvas a rendering context
var canvas = document.getElementById("canvas");
var c = (_a = canvas.getContext("2d")) !== null && _a !== void 0 ? _a : null;
// TODO: deprecated will be removed
exports.globalOriginVector = new Vector_1.default(0, 0);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// draws a grid so it is easier to see an objects motion
function drawGrid() {
    if (!controls_1.controls.View.Grid.value)
        return;
    c.beginPath();
    // c.setTransform(1, 0, 0, 1, 0, 0);
    // c.translate(controls.View.View_Coordinates.x, controls.View.View_Coordinates.y)
    c.strokeStyle = "black";
    c.lineWidth = 1;
    var units = [
        "mm", "cm", "m", "km"
    ];
    var i = 2;
    var s = controls_1.controls.View.Zoom.value;
    if (!s) {
        s = 1;
    }
    // optimize grid drawing, 
    // for example, when s < 1, change the units from m^2 to km^2, then so on and so forth
    while (s <= 1) {
        i += 1;
        s *= 10;
    }
    for (var Y = 0; Y < canvas.height; Y += s) {
        c.moveTo(0, Y);
        c.lineTo(canvas.width, Y);
    }
    c.stroke();
    for (var X = 0; X < canvas.width; X += s) {
        c.moveTo(X, 0);
        c.lineTo(X, canvas.height);
    }
    c.stroke();
    // draw in the bottom right corner the size of each square
    c.fillText("1 x 1 ".concat(units[i], "^2"), canvas.width - 50, canvas.height - 20);
}
exports.drawGrid = drawGrid;
// draws a dot on the screen at a certain point
function drawPoint(x, y, color) {
    if (color === void 0) { color = "black"; }
    c.beginPath();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls_1.controls.View.View_Coordinates.x, controls_1.controls.View.View_Coordinates.y);
    c.fillStyle = color;
    c.fillRect(x, canvas.height - y, 10, 10);
}
exports.drawPoint = drawPoint;
// draws a vector with its magnitude in pixels from the origin
function drawVector(vector, color, origin) {
    if (color === void 0) { color = "black"; }
    if (origin === void 0) { origin = exports.globalOriginVector; }
    c.beginPath();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls_1.controls.View.View_Coordinates.x, controls_1.controls.View.View_Coordinates.y);
    c.lineWidth = 1;
    c.strokeStyle = color;
    var originCoord = Coordinate_1.default.FromVector(origin);
    c.moveTo(originCoord.x * controls_1.controls.View.Zoom.value, canvas.height - originCoord.y * controls_1.controls.View.Zoom.value);
    var x = -vector.getXComponent();
    var y = vector.getYComponent();
    c.lineTo(originCoord.x * controls_1.controls.View.Zoom.value - x, canvas.height - y - originCoord.y * controls_1.controls.View.Zoom.value);
    c.stroke();
}
exports.drawVector = drawVector;
// draws the statistics of an object
function drawObjectStats(p, v, a) {
    var _a = Coordinate_1.default.FromVector(p), x = _a.x, y = _a.y;
    y = canvas.height - y;
    c.beginPath();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls_1.controls.View.View_Coordinates.x, controls_1.controls.View.View_Coordinates.y);
    c.font = "bold 30px serif";
    c.fillText("Pos: " + p.readable() + ", V: " + v.readable() + ", a: " + a.readable(), x, y);
}
exports.drawObjectStats = drawObjectStats;
// draws an object with its mass as the radius
function drawObj(object, fill) {
    if (fill === void 0) { fill = true; }
    c.beginPath();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls_1.controls.View.View_Coordinates.x, controls_1.controls.View.View_Coordinates.y);
    // c.fillStyle = object.color
    if (object.charge < 0) {
        c.fillStyle = "red";
    }
    else if (object.charge > 0) {
        c.fillStyle = "blue";
    }
    else {
        c.fillStyle = object.color;
    }
    c.lineWidth = 5;
    c.strokeStyle = object.color;
    var _a = Coordinate_1.default.FromVector(object.pos), x = _a.x, y = _a.y;
    c.arc(x * controls_1.controls.View.Zoom.value, canvas.height - y * controls_1.controls.View.Zoom.value, object.radius() * controls_1.controls.View.Zoom.value, 0, 2 * Math.PI);
    if (fill) {
        c.fill();
    }
    else {
        c.stroke();
    }
    if (controls_1.controls.View.Show_Velocity_Vector)
        drawVector(object.velocity.multiplyByScalar(controls_1.controls.View.Zoom.value), "green", object.pos);
    if (controls_1.controls.View.Show_Acceleration_Vector)
        drawVector(object.acceleration.multiplyByScalar(controls_1.controls.View.Zoom.value), "red", object.pos);
    // now draw a black line in the direction of the rotation of the object.
    c.strokeStyle = "black";
    c.moveTo(x * controls_1.controls.View.Zoom.value, canvas.height - y * controls_1.controls.View.Zoom.value);
    c.lineTo(x * controls_1.controls.View.Zoom.value + object.radius() * controls_1.controls.View.Zoom.value * Math.cos(object.theta), canvas.height - y * controls_1.controls.View.Zoom.value + object.radius() * controls_1.controls.View.Zoom.value * Math.sin(object.theta));
    c.stroke();
}
exports.drawObj = drawObj;
function renderMouse() {
    var obj = new Obj_1.default("black", Main_1.mouseVector, new Vector_1.default(controls_1.controls["Object"]["Velocity"].magnitude, controls_1.controls["Object"]["Velocity"].direction / 180 * Math.PI), new Vector_1.default(0, 0), controls_1.controls["Object"]["Mass"]["value"]);
    obj.density = controls_1.controls.Object.Density.value;
    drawObj(obj, false);
}
exports.renderMouse = renderMouse;
// draws a vector at location v
function drawVectorStat(v, color) {
    var _a = Coordinate_1.default.FromVector(v), x = _a.x, y = _a.y;
    y = canvas.height - y;
    c.beginPath();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.translate(controls_1.controls.View.View_Coordinates.x, controls_1.controls.View.View_Coordinates.y);
    c.strokeStyle = color;
    c.font = "bold 30px serif";
    c.fillText(v.readable(), x, y);
}
exports.drawVectorStat = drawVectorStat;
function clearCanvas() {
    // reset the transformation
    c.setTransform(1, 0, 0, 1, 0, 0);
    // clear the screen every frame
    c.clearRect(0, 0, canvas.width, canvas.height);
}
exports.clearCanvas = clearCanvas;


/***/ }),

/***/ "./src/Vector.ts":
/*!***********************!*\
  !*** ./src/Vector.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Coordinate_1 = __webpack_require__(/*! ./Coordinate */ "./src/Coordinate.ts");
var Vector = /** @class */ (function () {
    // direction is in radians
    function Vector(m, d) {
        this.magnitude = m;
        this.direction = d;
    }
    Vector.prototype.update = function (nVector) {
        this.direction = nVector.direction;
        this.magnitude = nVector.magnitude;
    };
    Vector.prototype.toString = function () {
        return "<".concat(this.magnitude, ", ").concat(this.direction, ">");
    };
    // returns a unit vector
    // maintains direction but has a magnitude of 1
    Vector.prototype.unit = function () {
        return new Vector(1, this.direction);
    };
    // returns a new vector with its magnitude multiplied by s
    Vector.prototype.multiplyByScalar = function (s) {
        return new Vector(this.magnitude * s, this.direction);
    };
    // returns a new vector with its magnitude multiplied by s
    Vector.prototype.power = function (p) {
        return new Vector(Math.pow(this.magnitude, p), this.direction);
    };
    // returns the X component of the vector
    Vector.prototype.getXComponent = function () {
        return this.magnitude * Math.cos(this.direction);
    };
    // returns the Y component of the vector
    Vector.prototype.getYComponent = function () {
        return this.magnitude * Math.sin(this.direction);
    };
    // is the magnitude 0 or Nan?
    Vector.prototype.isNull = function () {
        return this.magnitude == 0;
    };
    Vector.prototype.isNaN = function () {
        return Number.isNaN(this.magnitude);
    };
    // TODO: innefictient.
    Vector.prototype.equals = function (v2, roundTo) {
        if (roundTo === void 0) { roundTo = 4; }
        return v2.magnitude.toFixed(roundTo) == this.magnitude.toFixed(roundTo) && v2.direction.toFixed(roundTo) == this.direction.toFixed(roundTo);
    };
    // returns a new vector but pointing in the other direction
    Vector.prototype.negative = function () {
        return new Vector(this.magnitude, this.direction + Math.PI);
    };
    // adds two vectors, with the magnitude of b being multiplied by scale
    Vector.Add = function (a, b, scale) {
        if (scale === void 0) { scale = 1; }
        if (a.isNull() || a.isNaN()) {
            return b;
        }
        else if (b.isNull() || b.isNaN()) {
            return a;
        }
        var xComponent = a.getXComponent() + b.getXComponent() * scale;
        var yComponent = a.getYComponent() + b.getYComponent() * scale;
        var combined = Math.sqrt(Math.pow(xComponent, 2) + Math.pow(yComponent, 2));
        var dir = Math.atan2(yComponent, xComponent);
        return new Vector(combined, dir);
    };
    // subtracts two vectors, with the magnitude of b being multiplied by scale
    Vector.Subtract = function (a, b, scale) {
        if (scale === void 0) { scale = 1; }
        return Vector.Add(a, b.negative(), scale);
    };
    Vector.DotProduct = function (a, b) {
        var theta = Vector.Subtract(a, b).direction;
        return a.magnitude * b.magnitude * Math.cos(theta);
    };
    Vector.CrossProduct = function (a, b) {
        /// TODO: make this function
    };
    // converts a Coord into a vector, relative to relativeTo
    Vector.FromCoord = function (coord, relativeTo) {
        if (relativeTo === void 0) { relativeTo = new Coordinate_1.default(0, 0); }
        var dir = Math.atan2((coord.y - relativeTo.y), (coord.x - relativeTo.x)) || 0;
        var mag = Math.sqrt(Math.pow(coord.y - relativeTo.y, 2) + Math.pow(coord.x - relativeTo.x, 2));
        return new Vector(mag, dir);
    };
    return Vector;
}());
exports["default"] = Vector;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztBQy9QWTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsR0FBRyxXQUFXLEdBQUcs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Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96YWdhdGEvLi9zcmMvQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly96YWdhdGEvLi9zcmMvQ29vcmRpbmF0ZS50cyIsIndlYnBhY2s6Ly96YWdhdGEvLi9zcmMvR3Jhdml0eS9jb250cm9scy50cyIsIndlYnBhY2s6Ly96YWdhdGEvLi9zcmMvR3Jhdml0eS9ncmF2aXR5LnRzIiwid2VicGFjazovL3phZ2F0YS8uL3NyYy9NYWluLnRzIiwid2VicGFjazovL3phZ2F0YS8uL3NyYy9PYmoudHMiLCJ3ZWJwYWNrOi8vemFnYXRhLy4vc3JjL1JlbmRlci50cyIsIndlYnBhY2s6Ly96YWdhdGEvLi9zcmMvVmVjdG9yLnRzIiwid2VicGFjazovL3phZ2F0YS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly96YWdhdGEvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly96YWdhdGEvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3phZ2F0YS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEVyaWMgRGlza2luXG4gKiBOb3YgMTcsIDIwMjNcbiAqIENvbnRyb2xsZXI6XG4gKiAgQW4gb3ZlcmxheSB0aGF0IGNvbnRhaW5zIGluZm9ybWF0aW9uIG9uIHRoZSB3b3JsZCBhbmQgY29udGFpbnMgY29udHJvbHMgZm9yIHRoZSBzeXN0ZW0gYW5kIGl0cyBvYmplY3RzXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXBkYXRlQ29udHJvbCA9IHZvaWQgMDtcbnZhciBjb250cm9sc18xID0gcmVxdWlyZShcIi4vR3Jhdml0eS9jb250cm9sc1wiKTtcbi8vIGZvciB0aGUgbW92ZW1lbnQgb2YgdGhlIGNvbnRyb2xsZXIgYm94LlxuLy8gb25seSBjYWxsZWQgb25jZSwgd2hlbiB0aGUgd2luZG93IGlzIGxvYWRlZC5cbmZ1bmN0aW9uIGNvbmZpZ3VyZUNvbnRyb2xsZXJCb3goKSB7XG4gICAgLy8vIFRoZSBtb3ZlbWVudCBvZiB0aGUgYm94XG4gICAgdmFyIHNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1ib3gtbWFpblwiKVswXTtcbiAgICAvLyBzZXRzIHRvIHRydWUgd2hlbiB0aGUgYm94IGlzIGJlaW5nIGRyYWdnZWQuXG4gICAgdmFyIG1vdmluZ0NvbnRyb2xsZXJCb3ggPSBmYWxzZTtcbiAgICAvLyBzZXQgaXRzIHBvc2l0aW9uIHRvIHRoZSBtaWRkbGUgaXNoIG9mIHRoZSBzY3JlZW5cbiAgICBzZWwuc3R5bGUubGVmdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gNSArIFwicHhcIjtcbiAgICBzZWwuc3R5bGUudG9wID0gd2luZG93LmlubmVySGVpZ2h0IC8gNSArIFwicHhcIjtcbiAgICAvLyB3aGVuIHRoZSBtb3VzZSBpcyBkb3duICYgaXRzIHRhcmdldCBpcyB0aGUgYm94LCBtb3ZlIGl0LlxuICAgIHNlbC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gc2VsKSB7XG4gICAgICAgICAgICBtb3ZpbmdDb250cm9sbGVyQm94ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgc2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IHNlbCkge1xuICAgICAgICAgICAgLy8gdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjb250cm9sbGVyIGJveC5cbiAgICAgICAgICAgIEFycmF5LmZyb20oc2VsLmNoaWxkcmVuKS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgICAgYy5zdHlsZS5kaXNwbGF5ID0gYy5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIiA/IFwibm9uZVwiIDogXCJibG9ja1wiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyB3aGVuIHRoZSBtb3VzZSBpcyBsaWZ0ZWQgc3RvcCBtb3ZpbmcgaXQuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIG1vdmluZ0NvbnRyb2xsZXJCb3ggPSBmYWxzZTtcbiAgICB9KTtcbiAgICAvLyBtb3ZlIHRoZSBib3hcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAobW92aW5nQ29udHJvbGxlckJveCkge1xuICAgICAgICAgICAgaWYgKGUuY2xpZW50WCAtIDMyIDwgMCB8fCBlLmNsaWVudFggKyAxNiA+IHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZIC0gMzIgPCAwIHx8IGUuY2xpZW50WSArIDE2ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY2VudGVyIHRoZSBib3ggYXJvdW5kIHRoZSBjdXJzb3IuXG4gICAgICAgICAgICBzZWwuc3R5bGUudG9wID0gZS5jbGllbnRZIC0gMTYgKyAncHgnO1xuICAgICAgICAgICAgc2VsLnN0eWxlLmxlZnQgPSBlLmNsaWVudFggLSAxNiArICdweCc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIC8vIHRoZSBwcm9wZXJ0aWVzIHRoaXMgcGFnZSBjb250YWluc1xuICAgICAgICB2YXIgcGFnZSA9IGNvbnRyb2xzXzEuY29udHJvbHNbcF07XG4gICAgICAgIC8vIHRoZSBwYWdlIGl0c2VsZlxuICAgICAgICB2YXIgcGFnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgIHBhZ2VEaXYuY2xhc3NOYW1lID0gXCJwYWdlLW91dGxpbmUgcGFnZSBzZWxlY3Rvci1ib3gtY29udGVudC1tZW51IGhpZGRlblwiO1xuICAgICAgICBwYWdlRGl2LmlkID0gXCJzZWxlY3Rvci1ib3gtcGFnZS1cIiArIHA7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgdGl0bGUgb2YgdGhlIGNvbnRlbnQgbWVudSBwYWdlLlxuICAgICAgICB2YXIgcGFnZVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlNQQU5cIik7XG4gICAgICAgIHBhZ2VUaXRsZS5jbGFzc05hbWUgPSBcInNlbGVjdG9yLWJveC10aXRsZVwiO1xuICAgICAgICBwYWdlVGl0bGUuaW5uZXJIVE1MID0gcDtcbiAgICAgICAgcGFnZURpdi5hcHBlbmQocGFnZVRpdGxlKTtcbiAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoY3RybCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZm9yIHRoZSBpbnB1dDpcbiAgICAgICAgICAgIGlucHV0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlNQQU5cIik7XG4gICAgICAgICAgICBpbnB1dENvbnRhaW5lci5jbGFzc05hbWUgPSBcInNlbGVjdG9yLWlucHV0XCI7XG4gICAgICAgICAgICBpbnB1dENvbnRhaW5lci5pbm5lclRleHQgPSBjdHJsO1xuICAgICAgICAgICAgLy8gaWYgdGhlIGNvbnRyb2wgaXMgYSBudW1iZXI6XG4gICAgICAgICAgICBpZiAocGFnZVtjdHJsXS50eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0RWxfMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHR5cGUgb2YgdGhlIGlucHV0LlxuICAgICAgICAgICAgICAgIGlucHV0RWxfMS5jbGFzc05hbWUgPSBcInNlbGVjdG9yLWJveC1pbnB1dFwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxfMS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsXzEudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbF8xLnZhbHVlID0gcGFnZVtjdHJsXS52YWx1ZTtcbiAgICAgICAgICAgICAgICBpbnB1dEVsXzEuaWQgPSBcImNvbnRyb2xzLlwiLmNvbmNhdChwLCBcIi5cIikuY29uY2F0KGN0cmwpO1xuICAgICAgICAgICAgICAgIC8vIGV2ZW50c1xuICAgICAgICAgICAgICAgIGlucHV0RWxfMS5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLnZhbHVlID0gTnVtYmVyLnBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5wdXRFbF8xLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbC5cbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS52YWx1ZSA9IE51bWJlci5wYXJzZUZsb2F0KGlucHV0RWxfMS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5wdXRDb250YWluZXIuYXBwZW5kKGlucHV0RWxfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlW2N0cmxdLnR5cGUgPT09IFwiY29vcmRpbmF0ZXNcIikge1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dEVsWCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHR5cGUgb2YgdGhlIGlucHV0LlxuICAgICAgICAgICAgICAgIGlucHV0RWxYLmNsYXNzTmFtZSA9IFwic2VsZWN0b3ItYm94LWlucHV0XCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbFguc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbFgudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbFgudmFsdWUgPSBwYWdlW2N0cmxdLng7XG4gICAgICAgICAgICAgICAgLy8gZXZlbnRzXG4gICAgICAgICAgICAgICAgaW5wdXRFbFguYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wuXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLnggPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbnB1dEVsWC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wuXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLnggPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRFbFkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU5QVVRcIik7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSB0eXBlIG9mIHRoZSBpbnB1dC5cbiAgICAgICAgICAgICAgICBpbnB1dEVsWS5jbGFzc05hbWUgPSBcInNlbGVjdG9yLWJveC1pbnB1dFwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxZLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxZLnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxZLnZhbHVlID0gcGFnZVtjdHJsXS55O1xuICAgICAgICAgICAgICAgIGlucHV0RWxZLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sLlxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS55ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5wdXRFbFkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sLlxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS55ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5wdXRDb250YWluZXIuYXBwZW5kKGlucHV0RWxYLCBpbnB1dEVsWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlW2N0cmxdLnR5cGUgPT09IFwidmVjdG9yXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRFbE1hZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHR5cGUgb2YgdGhlIGlucHV0LlxuICAgICAgICAgICAgICAgIGlucHV0RWxNYWcuY2xhc3NOYW1lID0gXCJzZWxlY3Rvci1ib3gtaW5wdXRcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsTWFnLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxNYWcudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbE1hZy52YWx1ZSA9IHBhZ2VbY3RybF0ubWFnbml0dWRlO1xuICAgICAgICAgICAgICAgIC8vIGV2ZW50c1xuICAgICAgICAgICAgICAgIGlucHV0RWxNYWcuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wuXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLm1hZ25pdHVkZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlucHV0RWxNYWcuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sLlxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS5tYWduaXR1ZGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRFbERpciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTlBVVFwiKTtcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHR5cGUgb2YgdGhlIGlucHV0LlxuICAgICAgICAgICAgICAgIGlucHV0RWxEaXIuY2xhc3NOYW1lID0gXCJzZWxlY3Rvci1ib3gtaW5wdXRcIjtcbiAgICAgICAgICAgICAgICBpbnB1dEVsRGlyLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgICAgICAgICAgICAgIGlucHV0RWxEaXIudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgICAgICAgICAgaW5wdXRFbERpci52YWx1ZSA9IHBhZ2VbY3RybF0uZGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgIGlucHV0RWxEaXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wuXG4gICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLmRpcmVjdGlvbiA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlucHV0RWxEaXIuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sLlxuICAgICAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS5kaXJlY3Rpb24gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbnB1dENvbnRhaW5lci5hcHBlbmQoaW5wdXRFbE1hZywgaW5wdXRFbERpcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlW2N0cmxdLnR5cGUgPT09IFwiYm9vbFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gZm9mciBhIGNoZWNrYm94L2Jvb2wgdHlwZSBvZiBjb250cm9sLlxuICAgICAgICAgICAgICAgIHZhciBzd2l0Y2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiTEFCRUxcIik7XG4gICAgICAgICAgICAgICAgc3dpdGNoQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwic2VsZWN0b3ItYm94LXN3aXRjaFwiO1xuICAgICAgICAgICAgICAgIHZhciBzd2l0Y2hJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTlBVVFwiKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hJbnB1dC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgICAgICAgIHN3aXRjaElucHV0LmlkID0gXCJjb250cm9scy5cIi5jb25jYXQocCwgXCIuXCIpLmNvbmNhdChjdHJsKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2hJbnB1dC5jbGFzc05hbWUgPSBcInNlbGVjdG9yLWJveC1pbnB1dCBoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICBzd2l0Y2hJbnB1dC5jaGVja2VkID0gY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgc3dpdGNoU2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIlNQQU5cIik7XG4gICAgICAgICAgICAgICAgc3dpdGNoU2xpZGVyLmNsYXNzTmFtZSA9IFwic2VsZWN0b3ItYm94LXNsaWRlclwiO1xuICAgICAgICAgICAgICAgIC8vIHRoZSBldmVudHMgZm9yIHRoZSBpbnB1dFxuICAgICAgICAgICAgICAgIHN3aXRjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9sc1twXVtjdHJsXS52YWx1ZSA9ICFjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN3aXRjaENvbnRhaW5lci5hcHBlbmQoc3dpdGNoSW5wdXQsIHN3aXRjaFNsaWRlcik7XG4gICAgICAgICAgICAgICAgaW5wdXRDb250YWluZXIuYXBwZW5kKHN3aXRjaENvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYWdlW2N0cmxdLnR5cGUgPT09IFwiYnV0dG9uXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBmb2ZyIGEgY2hlY2tib3gvYm9vbCB0eXBlIG9mIGNvbnRyb2wuXG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJCVVRUT05cIik7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9IFwic2VsZWN0b3ItYm94LWJ0blwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5pZCA9IFwiY29udHJvbHMuXCIuY29uY2F0KHAsIFwiLlwiKS5jb25jYXQoY3RybCk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IFwiQ2xpY2tcIjtcbiAgICAgICAgICAgICAgICAvLyB0aGUgZXZlbnRzIGZvciB0aGUgaW5wdXRcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzW3BdW2N0cmxdLmFjdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpbnB1dENvbnRhaW5lci5hcHBlbmQoYnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhZ2VEaXYuYXBwZW5kKGlucHV0Q29udGFpbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gbm93LCBjcmVhdGUgYWxsIHRoZSBpbnB1dHMgYW5kIHRoZWlyIGV2ZW50cy5cbiAgICAgICAgZm9yICh2YXIgY3RybCBpbiBwYWdlKSB7XG4gICAgICAgICAgICBfbG9vcF8yKGN0cmwpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rvci1ib3gtbWVudVwiKVswXS5hcHBlbmQocGFnZURpdik7XG4gICAgfTtcbiAgICB2YXIgaW5wdXRDb250YWluZXI7XG4gICAgLy8vIGNyZWF0aW5nIHRoZSBwYW5lbHNcbiAgICAvLyB0aGUgY29udHJvbHMgdmFyaWFibGUgY29udGFpbnMgdGhlIGRhdGEgZm9yIHRoZSBvYmplY3RzLlxuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhjb250cm9sc18xLmNvbnRyb2xzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHAgPSBfYVtfaV07XG4gICAgICAgIF9sb29wXzEocCk7XG4gICAgfVxuICAgIC8vLyBTZWxlY3RpbmcgYW5kIGNoYW5naW5nIHBhbmVscy5cbiAgICAvLyBlYWNoIC5zZWxlY3Rvci1ib3gtc2VjdGlvbiB3aWxsIHNob3cgaXRzIHBhbmVsIGFuZCBiZWNvbWUgc2VsZWN0ZWQgd2hlbiBpdCBpcyBjbGlja2VkLlxuICAgIHZhciBwYW5lbEJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0b3ItYm94LXNlY3Rpb25cIik7XG4gICAgQXJyYXkuZnJvbShwYW5lbEJ1dHRvbnMpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgb3RoZXIgYnV0dG9ucyBkZXNlbGVjdGVkLCBcbiAgICAgICAgICAgIEFycmF5LmZyb20ocGFuZWxCdXR0b25zKS5mb3JFYWNoKGZ1bmN0aW9uIChlbDIpIHsgcmV0dXJuIGVsMi5jbGFzc0xpc3QucmVtb3ZlKFwiYnRuLXNlbGVjdGVkXCIpOyB9KTtcbiAgICAgICAgICAgIC8vIHRoZW4gc2VsZWN0IHRoaXMgYm94LlxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImJ0bi1zZWxlY3RlZFwiKTtcbiAgICAgICAgICAgIC8vIGhpZGUgZXZlcnkgb3RoZXIgcGFuZWxcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdG9yLWJveC1jb250ZW50LW1lbnVcIikpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIG5leHQsIGV4dHJhY3QgdGhlIG5hbWUgb2YgdGhlIHBhbmVsIGFuZCBzaG93IGl0LlxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3Rvci1ib3gtcGFnZS1cIiArIGVsLmlkLnNwbGl0KFwiLVwiKS5wb3AoKSkuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBjb25maWd1cmVDb250cm9sbGVyQm94O1xuZnVuY3Rpb24gdXBkYXRlQ29udHJvbChsb2NhdGlvbiwgdmFsdWUpIHtcbiAgICB2YXIgbCA9IGxvY2F0aW9uLnNwbGl0KFwiLlwiKS5yZWR1Y2UoZnVuY3Rpb24gKHB2LCBjdikgeyByZXR1cm4gcHZbY3ZdOyB9LCBjb250cm9sc18xLmNvbnRyb2xzKTtcbiAgICBpZiAobC50eXBlID09IFwibnVtYmVyXCIgfHwgbC50eXBlID09IFwiYm9vbFwiKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLlwiICsgbG9jYXRpb24pLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLlwiICsgbG9jYXRpb24pLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy5cIiArIGxvY2F0aW9uKS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xuICAgIH1cbiAgICBlbHNlIGlmIChsLnR5cGUgPT09IFwiY29vcmRpbmF0ZXNcIikge1xuICAgIH1cbn1cbmV4cG9ydHMudXBkYXRlQ29udHJvbCA9IHVwZGF0ZUNvbnRyb2w7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDb29yZGluYXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvb3JkaW5hdGUoWCwgWSwgWikge1xuICAgICAgICB0aGlzLnggPSBYO1xuICAgICAgICB0aGlzLnkgPSBZO1xuICAgICAgICB0aGlzLnogPSBaICE9PSBudWxsICYmIFogIT09IHZvaWQgMCA/IFogOiAwO1xuICAgIH1cbiAgICBDb29yZGluYXRlLkZyb21WZWN0b3IgPSBmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gbmV3IENvb3JkaW5hdGUodi5nZXRYQ29tcG9uZW50KCksIHYuZ2V0WUNvbXBvbmVudCgpKTtcbiAgICB9O1xuICAgIENvb3JkaW5hdGUuRGlzdGFuY2VGcm9tID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhhLnggLSBiLngsIDIpICsgTWF0aC5wb3coYS55IC0gYi55LCAyKSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29vcmRpbmF0ZTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBDb29yZGluYXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnRyb2xzID0gdm9pZCAwO1xudmFyIENvb3JkaW5hdGVfMSA9IHJlcXVpcmUoXCIuLi9Db29yZGluYXRlXCIpO1xudmFyIE1haW5fMSA9IHJlcXVpcmUoXCIuLi9NYWluXCIpO1xudmFyIE9ial8xID0gcmVxdWlyZShcIi4uL09ialwiKTtcbnZhciBWZWN0b3JfMSA9IHJlcXVpcmUoXCIuLi9WZWN0b3JcIik7XG5leHBvcnRzLmNvbnRyb2xzID0ge1xuICAgIE9iamVjdDoge1xuICAgICAgICBNYXNzOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgLy8gbWVhc3VyZWQgaW4gXG4gICAgICAgICAgICB1bml0czogXCJrZ1wiLFxuICAgICAgICAgICAgLy8gZWFydGhzIG1hc3NcbiAgICAgICAgICAgIC8vIHZhbHVlOiA1Ljk3MiAqIE1hdGgucG93KDEwLCAyNCksXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBWZWxvY2l0eToge1xuICAgICAgICAgICAgdHlwZTogXCJ2ZWN0b3JcIixcbiAgICAgICAgICAgIC8vIG1lYXN1cmVkIGluIFxuICAgICAgICAgICAgdW5pdHM6IFwibS9zXCIsXG4gICAgICAgICAgICBtYWduaXR1ZGU6IDAsXG4gICAgICAgICAgICBkaXJlY3Rpb246IDBcbiAgICAgICAgfSxcbiAgICAgICAgRGVuc2l0eToge1xuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIC8vIG1lYXN1cmVkIGluIFxuICAgICAgICAgICAgdW5pdHM6IFwia2cvbV4yXCIsXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBQb3NpdGlvbjoge1xuICAgICAgICAgICAgdHlwZTogXCJjb29yZGluYXRlc1wiLFxuICAgICAgICAgICAgLy8gbWVhc3VyZWQgaW4gXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9LFxuICAgICAgICBUaGV0YToge1xuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHVuaXRzOiBcInJhZFwiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgT21lZ2E6IHtcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB1bml0czogXCJyYWQvc1wiLFxuICAgICAgICAgICAgdmFsdWU6IDBcbiAgICAgICAgfSxcbiAgICAgICAgQWxwaGE6IHtcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB1bml0czogXCJyYWQvc14yXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBDaGFyZ2U6IHtcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB1bml0czogXCJDXCIsXG4gICAgICAgICAgICB2YWx1ZTogMFxuICAgICAgICB9LFxuICAgICAgICBQbGFjaW5nOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJvb2xcIixcbiAgICAgICAgICAgIHZhbHVlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIFBsYWNlOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld09iaiA9IG5ldyBPYmpfMS5kZWZhdWx0KFwiZ3JheVwiLCBWZWN0b3JfMS5kZWZhdWx0LkZyb21Db29yZChuZXcgQ29vcmRpbmF0ZV8xLmRlZmF1bHQoZXhwb3J0cy5jb250cm9scy5PYmplY3QuUG9zaXRpb24ueCwgZXhwb3J0cy5jb250cm9scy5PYmplY3QuUG9zaXRpb24ueSkpLCBuZXcgVmVjdG9yXzEuZGVmYXVsdChleHBvcnRzLmNvbnRyb2xzW1wiT2JqZWN0XCJdW1wiVmVsb2NpdHlcIl0ubWFnbml0dWRlLCBleHBvcnRzLmNvbnRyb2xzW1wiT2JqZWN0XCJdW1wiVmVsb2NpdHlcIl0uZGlyZWN0aW9uICogTWF0aC5QSSAvIDE4MCksIG5ldyBWZWN0b3JfMS5kZWZhdWx0KDAsIDApLCBleHBvcnRzLmNvbnRyb2xzW1wiT2JqZWN0XCJdW1wiTWFzc1wiXVtcInZhbHVlXCJdKTtcbiAgICAgICAgICAgICAgICBuZXdPYmouZGVuc2l0eSA9IGV4cG9ydHMuY29udHJvbHMuT2JqZWN0LkRlbnNpdHkudmFsdWU7XG4gICAgICAgICAgICAgICAgbmV3T2JqLnRoZXRhID0gZXhwb3J0cy5jb250cm9scy5PYmplY3QuVGhldGEudmFsdWU7XG4gICAgICAgICAgICAgICAgbmV3T2JqLm9tZWdhID0gZXhwb3J0cy5jb250cm9scy5PYmplY3QuT21lZ2EudmFsdWU7XG4gICAgICAgICAgICAgICAgbmV3T2JqLmFscGhhID0gZXhwb3J0cy5jb250cm9scy5PYmplY3QuQWxwaGEudmFsdWU7XG4gICAgICAgICAgICAgICAgTWFpbl8xLm9iamVjdHMucHVzaChuZXdPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBTeXN0ZW06IHtcbiAgICAgICAgR3Jhdml0eToge1xuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHVuaXRzOiBcIm0vc14yXCIsXG4gICAgICAgICAgICB2YWx1ZTogNi42NzQzICogTWF0aC5wb3coMTAsIC0xMSlcbiAgICAgICAgfSxcbiAgICAgICAgUGVybWVhYmlsaXR5X0NvbnN0YW50OiB7XG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgdW5pdHM6IFwiXCIsXG4gICAgICAgICAgICB2YWx1ZTogOC44NTQxODc4MTdlLTEyXG4gICAgICAgIH0sXG4gICAgICAgIFNpbXVsYXRpb25fU3BlZWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB1bml0czogXCJzXCIsXG4gICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICB9LFxuICAgICAgICBQYXVzZWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbFwiLFxuICAgICAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIEVsYXN0aWNfQ29sbGlzaW9uczoge1xuICAgICAgICAgICAgdHlwZTogXCJib29sXCIsXG4gICAgICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG4gICAgVmlldzoge1xuICAgICAgICBab29tOiB7XG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgdW5pdHM6IFwibV4yXCIsXG4gICAgICAgICAgICB2YWx1ZTogMTAwXG4gICAgICAgIH0sXG4gICAgICAgIFZpZXdfQ29vcmRpbmF0ZXM6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiY29vcmRpbmF0ZXNcIixcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgejogMFxuICAgICAgICB9LFxuICAgICAgICBTY3JvbGxfU3BlZWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB1bml0czogXCJtL3NcIixcbiAgICAgICAgICAgIHZhbHVlOiAxXG4gICAgICAgIH0sXG4gICAgICAgIEdyaWQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbFwiLFxuICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgU2hvd19WZWxvY2l0eV9WZWN0b3I6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbFwiLFxuICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgU2hvd19BY2NlbGVyYXRpb25fVmVjdG9yOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJvb2xcIixcbiAgICAgICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuLi9Db250cm9sbGVyXCIpO1xudmFyIENvb3JkaW5hdGVfMSA9IHJlcXVpcmUoXCIuLi9Db29yZGluYXRlXCIpO1xudmFyIE1haW5fMSA9IHJlcXVpcmUoXCIuLi9NYWluXCIpO1xudmFyIE9ial8xID0gcmVxdWlyZShcIi4uL09ialwiKTtcbnZhciBSZW5kZXJfMSA9IHJlcXVpcmUoXCIuLi9SZW5kZXJcIik7XG52YXIgVmVjdG9yXzEgPSByZXF1aXJlKFwiLi4vVmVjdG9yXCIpO1xudmFyIGNvbnRyb2xzXzEgPSByZXF1aXJlKFwiLi9jb250cm9sc1wiKTtcbnZhciBncmF2aXR5ID0gdHJ1ZTtcbi8vIHRoZSBzcGVlZCBhdCB3aGljaCB0aGUgdXNlciBpcyBhYmxlIHRvIHNjcm9sbCB1c2luZyB0aGUgYXJyb3cga2V5c1xudmFyIHNjcm9sbFNwZWVkID0gMjA7XG4vLyBkZWx0YXRpbWUgKG1lYXN1cmVkIGluIHdoYXQgdW5pdHM/KVxudmFyIGR0ID0gMDtcbi8vIGZvciBjYWxjdWxhdGluZyBkdFxudmFyIGxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG52YXIgZnJhbWUgPSAwO1xuZnVuY3Rpb24gbnRoRnJhbWUoZnVuYywgZm5vKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShmcmFtZSAlIGZubyA9PT0gMCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmdW5jKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gSW5pdGlhbGl6ZSgpIHtcbiAgICAvLyB0aGUgZ2FtZSBsb29wXG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqZWN0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVyKSB7XG4gICAgICAgIH1cbiAgICAgICAgZnJhbWUrKztcbiAgICAgICAgKDAsIFJlbmRlcl8xLmNsZWFyQ2FudmFzKSgpO1xuICAgICAgICAvLyBkcmF3IHRoZSBncmlkXG4gICAgICAgICgwLCBSZW5kZXJfMS5kcmF3R3JpZCkoKTtcbiAgICAgICAgLy8gY2FsY3VsYXRlIGRlbHRhIHRpbWVcbiAgICAgICAgdmFyIHRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgZHQgPSAodGltZSAtIGxhc3RUaW1lKSAvIE1haW5fMS5mcHMgKiBjb250cm9sc18xLmNvbnRyb2xzLlN5c3RlbS5TaW11bGF0aW9uX1NwZWVkLnZhbHVlO1xuICAgICAgICBpZiAoIWNvbnRyb2xzXzEuY29udHJvbHMuU3lzdGVtLlBhdXNlZC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGFuZCByZW5kZXIgdGhlIG9iamVjdHNcbiAgICAgICAgICAgIE1haW5fMS5vYmplY3RzLmZvckVhY2goZnVuY3Rpb24gKG9iaiwgaSkge1xuICAgICAgICAgICAgICAgIGlmIChvYmoubWFzcyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIE1haW5fMS5vYmplY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqLnVwZGF0ZShkdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZ3Jhdml0eSBvZiBhbGwgb2JqZWN0c1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBNYWluXzEub2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0b3RhbEFjY2VsZXJhdGlvbiA9IG5ldyBWZWN0b3JfMS5kZWZhdWx0KDAsIDApO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgTWFpbl8xLm9iamVjdHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYW4gb2JqZWN0IGNvbXBhcmVkIHdpdGggaXRzZWxmIGhhcyBpbmZpbml0ZSBncmF2aXR5XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IGopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgZ3Jhdml0eSBvZiBlYWNoIG9iamVjdCB0b3dhcmRzIGVhY2ggb3RoZXIgb25lXG4gICAgICAgICAgICAgICAgICAgIHZhciBncmF2aXR5VmVjdG9yID0gVmVjdG9yXzEuZGVmYXVsdC5TdWJ0cmFjdChNYWluXzEub2JqZWN0c1tqXS5wb3MsIE1haW5fMS5vYmplY3RzW2ldLnBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGdyYXZpdHlWZWN0b3IubWFnbml0dWRlID0gY29udHJvbHNfMS5jb250cm9scy5TeXN0ZW0uR3Jhdml0eS52YWx1ZSAqICgoTWFpbl8xLm9iamVjdHNbaV0ubWFzcyAqIE1haW5fMS5vYmplY3RzW2pdLm1hc3MpIC8gVmVjdG9yXzEuZGVmYXVsdC5TdWJ0cmFjdChNYWluXzEub2JqZWN0c1tpXS5wb3MsIE1haW5fMS5vYmplY3RzW2pdLnBvcykucG93ZXIoMikubWFnbml0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBmb3JjZSBvZiBlbGVjdHJpYyBjaGFyZ2UgXG4gICAgICAgICAgICAgICAgICAgIHZhciBlZm9yY2VWZWN0b3IgPSBWZWN0b3JfMS5kZWZhdWx0LlN1YnRyYWN0KE1haW5fMS5vYmplY3RzW2pdLnBvcywgTWFpbl8xLm9iamVjdHNbaV0ucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgZWZvcmNlVmVjdG9yLm1hZ25pdHVkZSA9ICgxIC8gKDQgKiBNYXRoLlBJICogY29udHJvbHNfMS5jb250cm9scy5TeXN0ZW0uUGVybWVhYmlsaXR5X0NvbnN0YW50LnZhbHVlKSkgKiAoKE1haW5fMS5vYmplY3RzW2ldLmNoYXJnZSAqIE1haW5fMS5vYmplY3RzW2pdLmNoYXJnZSkgLyBWZWN0b3JfMS5kZWZhdWx0LlN1YnRyYWN0KE1haW5fMS5vYmplY3RzW2ldLnBvcywgTWFpbl8xLm9iamVjdHNbal0ucG9zKS5wb3dlcigyKS5tYWduaXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkcmF3VmVjdG9yKGdyYXZpdHlWZWN0b3IubXVsdGlwbHlCeVNjYWxhcig1MDApLCBcInJlZFwiLCBvYmplY3RzW2ldLnBvcylcbiAgICAgICAgICAgICAgICAgICAgLy8gZGV0ZWN0IGNvbGxpc2lvbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlyc3QgZ2V0IHBvc2l0aW9ucyBvZiBib3RoIG9iamVjdHMgaW4gdGhlIGNvb3JkaW5hdGUgcGxhbmVcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iajFQb3MgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKE1haW5fMS5vYmplY3RzW2ldLnBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmoyUG9zID0gQ29vcmRpbmF0ZV8xLmRlZmF1bHQuRnJvbVZlY3RvcihNYWluXzEub2JqZWN0c1tqXS5wb3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyBzZWNvbmQsIGdldCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBib3RoIG9mIHRoZSBwb2ludHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5EaXN0YW5jZUZyb20ob2JqMVBvcywgb2JqMlBvcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBtYXhpbXVtIGRpc3RhbmNlIGlzIGJvdGggb2YgdGhlIG9iamVjdHMgcmFkaXVzZXMgc3VtbWVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBtYXhEID0gTWF0aC5zcXJ0KG9iamVjdHNbaV0ubWFzcyAvIChNYXRoLlBJICogb2JqZWN0c1tpXS5kZW5zaXR5KSkgKyBNYXRoLnNxcnQob2JqZWN0c1tqXS5tYXNzIC8gKE1hdGguUEkgKiBvYmplY3RzW2pdLmRlbnNpdHkpKVxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4RCA9IE1haW5fMS5vYmplY3RzW2ldLnJhZGl1cygpICsgTWFpbl8xLm9iamVjdHNbal0ucmFkaXVzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoIWNvbnRyb2xzXzEuY29udHJvbHMuU3lzdGVtLkVsYXN0aWNfQ29sbGlzaW9ucy52YWx1ZSAmJiBkIDw9IG1heEQpICYmIE1haW5fMS5vYmplY3RzW2ldLm1hc3MgPD0gTWFpbl8xLm9iamVjdHNbal0ubWFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVyZmVjdGx5IGluZWxhc3RpYyBjb2xsaXNpb25zOlxuICAgICAgICAgICAgICAgICAgICAgICAgTWFpbl8xLm9iamVjdHNbal0udmVsb2NpdHkgPSBWZWN0b3JfMS5kZWZhdWx0LkFkZChNYWluXzEub2JqZWN0c1tpXS52ZWxvY2l0eS5tdWx0aXBseUJ5U2NhbGFyKE1haW5fMS5vYmplY3RzW2ldLm1hc3MpLCAoTWFpbl8xLm9iamVjdHNbal0udmVsb2NpdHkubXVsdGlwbHlCeVNjYWxhcihNYWluXzEub2JqZWN0c1tqXS5tYXNzKSkpLm11bHRpcGx5QnlTY2FsYXIoMSAvIChNYWluXzEub2JqZWN0c1tpXS5tYXNzICsgTWFpbl8xLm9iamVjdHNbal0ubWFzcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGxvY2tlZCBwcm9wZXJ0eSBpcyBkb21pbmFudFxuICAgICAgICAgICAgICAgICAgICAgICAgTWFpbl8xLm9iamVjdHNbal0ubG9ja2VkID0gTWFpbl8xLm9iamVjdHNbal0ubG9ja2VkIHx8IE1haW5fMS5vYmplY3RzW2ldLmxvY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1haW5fMS5vYmplY3RzW2pdLm1hc3MgKz0gTWFpbl8xLm9iamVjdHNbaV0ubWFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIE1haW5fMS5vYmplY3RzW2pdLmNoYXJnZSArPSBNYWluXzEub2JqZWN0c1tpXS5jaGFyZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBNYWluXzEub2JqZWN0c1tpXS5tYXNzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sc18xLmNvbnRyb2xzLlN5c3RlbS5FbGFzdGljX0NvbGxpc2lvbnMudmFsdWUgJiYgZCA8PSBtYXhEICYmIE1haW5fMS5vYmplY3RzW2ldLm1hc3MgPD0gTWFpbl8xLm9iamVjdHNbal0ubWFzcyAmJiBNYWluXzEub2JqZWN0c1tpXS5kaXN0YW5jZSA+IE1haW5fMS5vYmplY3RzW2pdLmRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFZtID0gTWFpbl8xLm9iamVjdHNbaV0udmVsb2NpdHkubWFnbml0dWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBWZCA9IE1haW5fMS5vYmplY3RzW2ldLnZlbG9jaXR5LmRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG0xdjE9bTJ2MiA9PT4gdiA9IG0xdi9tMlxuICAgICAgICAgICAgICAgICAgICAgICAgTWFpbl8xLm9iamVjdHNbaV0udmVsb2NpdHkgPSBNYWluXzEub2JqZWN0c1tqXS52ZWxvY2l0eS5tdWx0aXBseUJ5U2NhbGFyKE1haW5fMS5vYmplY3RzW2pdLm1hc3MgLyBNYWluXzEub2JqZWN0c1tpXS5tYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1haW5fMS5vYmplY3RzW2pdLnZlbG9jaXR5ID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQodGVtcFZtLCB0ZW1wVmQpLm11bHRpcGx5QnlTY2FsYXIoTWFpbl8xLm9iamVjdHNbaV0ubWFzcyAvIE1haW5fMS5vYmplY3RzW2pdLm1hc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxBY2NlbGVyYXRpb24gPSBWZWN0b3JfMS5kZWZhdWx0LkFkZCh0b3RhbEFjY2VsZXJhdGlvbiwgZ3Jhdml0eVZlY3Rvci5uZWdhdGl2ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQWNjZWxlcmF0aW9uID0gVmVjdG9yXzEuZGVmYXVsdC5BZGQodG90YWxBY2NlbGVyYXRpb24sIGVmb3JjZVZlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBmaW5hbCBncmF2aXR5XG4gICAgICAgICAgICAgICAgTWFpbl8xLm9iamVjdHNbaV0uYWNjZWxlcmF0aW9uID0gdG90YWxBY2NlbGVyYXRpb24ubXVsdGlwbHlCeVNjYWxhcigxIC8gTWFpbl8xLm9iamVjdHNbaV0ubWFzcyk7XG4gICAgICAgICAgICAgICAgaWYgKGdyYXZpdHkpXG4gICAgICAgICAgICAgICAgICAgIE1haW5fMS5vYmplY3RzW2ldLmFjY2VsZXJhdGlvbiA9IE1haW5fMS5vYmplY3RzW2ldLmFjY2VsZXJhdGlvbi5uZWdhdGl2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250cm9sczpcbiAgICAgICAgICogQXJyb3dzOiBMb29rIEFyb3VuZFxuICAgICAgICAgKiBNOiBJbmNyZWFzZSBzaXplIG9mIG9iamVjdFxuICAgICAgICAgKiBOOiBEZWNyZWFzZSBzaXplIG9mIG9iamVjdFxuICAgICAgICAgKiArOiBJbmNyZWFzZSBpbml0aXRhbCB2ZWxvY2l0eSBvZiBvYmplY3RcbiAgICAgICAgICogLTogRGVjcmVhc2UgaW5pdGl0YWwgdmVsb2NpdHkgb2Ygb2JqZWN0XG4gICAgICAgICAqIFo6IFJvdGF0ZSBpbml0aWFsIHZlbG9jdHkgY291bnRlci1jbG9ja3dpc2VcbiAgICAgICAgICogWDogUm90YXRlIGluaXRpYWwgdmVsb2N0eSBjbG9ja3dpc2VcbiAgICAgICAgICogU3BhY2U6IFBhdXNlXG4gICAgICAgICAqIEw6IEluY3JlYXNlIGdyYXZpdHkgKGJ5IG1hZ25pdHVkZXMgb2YgMilcbiAgICAgICAgICogTDogRGVjcmVhc2UgZ3Jhdml0eSAoYnkgbWFnbml0dWRlcyBvZiAyKVxuICAgICAgICAgKiBEOiBjb250cm9scy5WaWV3Llpvb20gc2NyZWVuIHVwXG4gICAgICAgICAqIFM6IGNvbnRyb2xzLlZpZXcuWm9vbSBzY3JlZW4gZG93blxuICAgICAgICAgKiBHOiBJbmNyZWFzZSBzY3JvbGwgc3BlZWRcbiAgICAgICAgICogRjogRGVjcmVhc2Ugc2Nyb2xsIHNwZWVkXG4gICAgICAgICAqIEg6IFJlc2V0IFZpZXdcbiAgICAgICAgICovXG4gICAgICAgIC8vIGtleXByZXNzZXM6XG4gICAgICAgIGlmIChrZXlzUHJlc3NlZC5pbmRleE9mKFwiQXJyb3dVcFwiKSA+PSAwKSB7XG4gICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuVmlld19Db29yZGluYXRlcy55ICs9IHNjcm9sbFNwZWVkO1xuICAgICAgICAgICAgdmFyIGEgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKE1haW5fMS5tb3VzZVZlY3Rvcik7XG4gICAgICAgICAgICBhLnkgKz0gc2Nyb2xsU3BlZWQ7XG4gICAgICAgICAgICBNYWluXzEubW91c2VWZWN0b3IudXBkYXRlKFZlY3Rvcl8xLmRlZmF1bHQuRnJvbUNvb3JkKGEpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5c1ByZXNzZWQuaW5kZXhPZihcIkFycm93RG93blwiKSA+PSAwKSB7XG4gICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuVmlld19Db29yZGluYXRlcy55IC09IHNjcm9sbFNwZWVkO1xuICAgICAgICAgICAgdmFyIGEgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKE1haW5fMS5tb3VzZVZlY3Rvcik7XG4gICAgICAgICAgICBhLnkgLT0gc2Nyb2xsU3BlZWQ7XG4gICAgICAgICAgICBNYWluXzEubW91c2VWZWN0b3IudXBkYXRlKFZlY3Rvcl8xLmRlZmF1bHQuRnJvbUNvb3JkKGEpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5c1ByZXNzZWQuaW5kZXhPZihcIkFycm93TGVmdFwiKSA+PSAwKSB7XG4gICAgICAgICAgICBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuVmlld19Db29yZGluYXRlcy54ICs9IHNjcm9sbFNwZWVkO1xuICAgICAgICAgICAgdmFyIGEgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKE1haW5fMS5tb3VzZVZlY3Rvcik7XG4gICAgICAgICAgICBhLnggLT0gc2Nyb2xsU3BlZWQ7XG4gICAgICAgICAgICBNYWluXzEubW91c2VWZWN0b3IudXBkYXRlKFZlY3Rvcl8xLmRlZmF1bHQuRnJvbUNvb3JkKGEpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5c1ByZXNzZWQuaW5kZXhPZihcIkFycm93UmlnaHRcIikgPj0gMCkge1xuICAgICAgICAgICAgY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueCAtPSBzY3JvbGxTcGVlZDtcbiAgICAgICAgICAgIHZhciBhID0gQ29vcmRpbmF0ZV8xLmRlZmF1bHQuRnJvbVZlY3RvcihNYWluXzEubW91c2VWZWN0b3IpO1xuICAgICAgICAgICAgYS54ICs9IHNjcm9sbFNwZWVkO1xuICAgICAgICAgICAgTWFpbl8xLm1vdXNlVmVjdG9yLnVwZGF0ZShWZWN0b3JfMS5kZWZhdWx0LkZyb21Db29yZChhKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleXNQcmVzc2VkLmluZGV4T2YoXCIgXCIpID49IDApIHtcbiAgICAgICAgICAgICgwLCBDb250cm9sbGVyXzEudXBkYXRlQ29udHJvbCkoXCJTeXN0ZW0uUGF1c2VkXCIsICFjb250cm9sc18xLmNvbnRyb2xzLlN5c3RlbS5QYXVzZWQudmFsdWUpO1xuICAgICAgICAgICAgLy8gc28gaXQgZG9lc250IHJhbmRvbWx5IHVucGF1c2VcbiAgICAgICAgICAgIGtleXNQcmVzc2VkLnNwbGljZShrZXlzUHJlc3NlZC5pbmRleE9mKFwiIFwiKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleXNQcmVzc2VkLmluZGV4T2YoXCI9XCIpID49IDApIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMuVmlldy5ab29tXCIpO1xuICAgICAgICAgICAgKDAsIENvbnRyb2xsZXJfMS51cGRhdGVDb250cm9sKShcIlZpZXcuWm9vbVwiLCBwYXJzZUludChlbC52YWx1ZSkgKyAxIC8gTWF0aC5zcXJ0KHBhcnNlSW50KGVsLnZhbHVlKSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXlzUHJlc3NlZC5pbmRleE9mKFwiTWludXNcIikgPj0gMCkge1xuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy5WaWV3Llpvb21cIik7XG4gICAgICAgICAgICAoMCwgQ29udHJvbGxlcl8xLnVwZGF0ZUNvbnRyb2wpKFwiVmlldy5ab29tXCIsIHBhcnNlSW50KGVsLnZhbHVlKSAtIDEgLyBNYXRoLnNxcnQocGFyc2VJbnQoZWwudmFsdWUpKSk7XG4gICAgICAgIH1cbiAgICAgICAgTWFpbl8xLm9iamVjdHMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICBvYmoucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY29udHJvbHNfMS5jb250cm9scy5PYmplY3QuUGxhY2luZy52YWx1ZSkge1xuICAgICAgICAgICAgLy8gcmVuZGVyIHRoZSBtb3VzZSBjaXJjbGVcbiAgICAgICAgICAgICgwLCBSZW5kZXJfMS5yZW5kZXJNb3VzZSkoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgY2FsY3VsYXRpbmcgZGVsdGEgdGltZVxuICAgICAgICBsYXN0VGltZSA9IHRpbWU7XG4gICAgfSwgTWFpbl8xLmZwcyk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBJbml0aWFsaXplO1xuLy8gdG8gbW9uaXRvciB3aGljaCBrZXlzIGFyZSBwcmVzc2VkXG52YXIga2V5c1ByZXNzZWQgPSBbXTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09IFwiSU5QVVRcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChrZXlzUHJlc3NlZC5pbmRleE9mKGUua2V5KSA9PSAtMSkge1xuICAgICAgICBrZXlzUHJlc3NlZC5wdXNoKGUua2V5KTtcbiAgICAgICAga2V5c1ByZXNzZWQucHVzaChlLmNvZGUpO1xuICAgIH1cbn0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09IFwiSU5QVVRcIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChrZXlzUHJlc3NlZC5pbmRleE9mKGUua2V5KSA+PSAwKSB7XG4gICAgICAgIGtleXNQcmVzc2VkLnNwbGljZShrZXlzUHJlc3NlZC5pbmRleE9mKGUua2V5KSwgMSk7XG4gICAgfVxuICAgIGlmIChrZXlzUHJlc3NlZC5pbmRleE9mKGUuY29kZSkgPj0gMCkge1xuICAgICAgICBrZXlzUHJlc3NlZC5zcGxpY2Uoa2V5c1ByZXNzZWQuaW5kZXhPZihlLmNvZGUpLCAxKTtcbiAgICB9XG4gICAgaWYgKGUua2V5ID09IFwiU3BhY2VcIikge1xuICAgICAgICAoMCwgQ29udHJvbGxlcl8xLnVwZGF0ZUNvbnRyb2wpKFwiU3lzdGVtLlBhdXNlZFwiLCAhY29udHJvbHNfMS5jb250cm9scy5TeXN0ZW0uUGF1c2VkLnZhbHVlKTtcbiAgICB9XG59KTtcbi8vIHdoZW4gdGhlIG1vdXNlIGlzIG1vdmVkLCB1cGRhdGUgdGhlIG1vdXNlVmVjdG9yXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLnggKj0gLTE7XG4gICAgTWFpbl8xLm1vdXNlVmVjdG9yLnVwZGF0ZShWZWN0b3JfMS5kZWZhdWx0LkFkZChWZWN0b3JfMS5kZWZhdWx0LkZyb21Db29yZChuZXcgQ29vcmRpbmF0ZV8xLmRlZmF1bHQoZS5jbGllbnRYIC8gY29udHJvbHNfMS5jb250cm9scy5WaWV3Llpvb20udmFsdWUsICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBlLmNsaWVudFkpIC8gY29udHJvbHNfMS5jb250cm9scy5WaWV3Llpvb20udmFsdWUpKSwgVmVjdG9yXzEuZGVmYXVsdC5Gcm9tQ29vcmQoY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMpLm11bHRpcGx5QnlTY2FsYXIoMSAvIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlKSkpO1xuICAgIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLnggKj0gLTE7XG59KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgIT0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikgfHwgIWNvbnRyb2xzXzEuY29udHJvbHMuT2JqZWN0LlBsYWNpbmcudmFsdWUpIHtcbiAgICAgICAgLy8gb25seSBwbGFjZSBhIG5ldyBibG9jayBpZiB0aGUgYWNudmFzIHdhcyBjbGlja2VkXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY29udmVydHMgdGhlIGRpcmVjdGlvbiBpbnRvIHJhZGlhbnNcbiAgICB2YXIgbmV3T2JqID0gbmV3IE9ial8xLmRlZmF1bHQoXCJncmF5XCIsIFZlY3Rvcl8xLmRlZmF1bHQuRnJvbUNvb3JkKENvb3JkaW5hdGVfMS5kZWZhdWx0LkZyb21WZWN0b3IoTWFpbl8xLm1vdXNlVmVjdG9yKSksIG5ldyBWZWN0b3JfMS5kZWZhdWx0KGNvbnRyb2xzXzEuY29udHJvbHNbXCJPYmplY3RcIl1bXCJWZWxvY2l0eVwiXS5tYWduaXR1ZGUsIGNvbnRyb2xzXzEuY29udHJvbHNbXCJPYmplY3RcIl1bXCJWZWxvY2l0eVwiXS5kaXJlY3Rpb24gKiBNYXRoLlBJIC8gMTgwKSwgbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCksIGNvbnRyb2xzXzEuY29udHJvbHNbXCJPYmplY3RcIl1bXCJNYXNzXCJdW1widmFsdWVcIl0pO1xuICAgIG5ld09iai5kZW5zaXR5ID0gY29udHJvbHNfMS5jb250cm9scy5PYmplY3QuRGVuc2l0eS52YWx1ZTtcbiAgICBuZXdPYmoudGhldGEgPSBjb250cm9sc18xLmNvbnRyb2xzLk9iamVjdC5UaGV0YS52YWx1ZTtcbiAgICBuZXdPYmoub21lZ2EgPSBjb250cm9sc18xLmNvbnRyb2xzLk9iamVjdC5PbWVnYS52YWx1ZTtcbiAgICBuZXdPYmouYWxwaGEgPSBjb250cm9sc18xLmNvbnRyb2xzLk9iamVjdC5BbHBoYS52YWx1ZTtcbiAgICBuZXdPYmouY2hhcmdlID0gY29udHJvbHNfMS5jb250cm9scy5PYmplY3QuQ2hhcmdlLnZhbHVlO1xuICAgIE1haW5fMS5vYmplY3RzLnB1c2gobmV3T2JqKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1vdXNlVmVjdG9yID0gZXhwb3J0cy5mcHMgPSBleHBvcnRzLm9iamVjdHMgPSB2b2lkIDA7XG52YXIgQ29udHJvbGxlcl8xID0gcmVxdWlyZShcIi4vQ29udHJvbGxlclwiKTtcbnZhciBncmF2aXR5XzEgPSByZXF1aXJlKFwiLi9HcmF2aXR5L2dyYXZpdHlcIik7XG52YXIgUmVuZGVyXzEgPSByZXF1aXJlKFwiLi9SZW5kZXJcIik7XG4vLyBhbGwgb2YgdGhlIG9iamVjdHMgaW4gdGhlIGdhbWVcbmV4cG9ydHMub2JqZWN0cyA9IFtdO1xuLy8gd29ybGQgc2V0dGluZ3M6XG4vLyBmcmFtZXJhdGVcbmV4cG9ydHMuZnBzID0gMTAwMCAvIDYwO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4cG9ydHMubW91c2VWZWN0b3IgPSBSZW5kZXJfMS5nbG9iYWxPcmlnaW5WZWN0b3I7IH0pO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGdyYXZpdHlfMS5kZWZhdWx0KTtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIENvbnRyb2xsZXJfMS5kZWZhdWx0KSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0b3ItYm94LU9iamVjdFwiKS5jbGljaygpO1xufSk7XG4vLyBmb3Igc2ltdWxhdGlvbnM6IFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoZXhwb3J0cy5vYmplY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGV4cG9ydHMub2JqZWN0cy5wb3AoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWFydGgtb2JqLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAoMCwgQ29udHJvbGxlcl8xLnVwZGF0ZUNvbnRyb2wpKFwiT2JqZWN0Lk1hc3NcIiwgNS45OTdFMjQpO1xuICAgICAgICAoMCwgQ29udHJvbGxlcl8xLnVwZGF0ZUNvbnRyb2wpKFwiT2JqZWN0LkRlbnNpdHlcIiwgNTUxNCk7XG4gICAgICAgICgwLCBDb250cm9sbGVyXzEudXBkYXRlQ29udHJvbCkoXCJPYmplY3QuT21lZ2FcIiwgMC4wMDAwNzI5MjExNSk7XG4gICAgICAgICgwLCBDb250cm9sbGVyXzEudXBkYXRlQ29udHJvbCkoXCJWaWV3Llpvb21cIiwgMUUtNSk7XG4gICAgfSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlbmRlcl8xID0gcmVxdWlyZShcIi4vUmVuZGVyXCIpO1xudmFyIFZlY3Rvcl8xID0gcmVxdWlyZShcIi4vVmVjdG9yXCIpO1xuLy8gY29udGFpbnMgZXZlcnkgYXR0cmlidXRlIGFuIG9iamVjdCBjb3VsZCBoYXZlLCB0aGVuIGNoaWxkcmVuIG9mIHRoaXMgY2xhc3MgY2FuIGhhdmUgdGhlaXIgb3duIHByb3BlcnRpZXMuXG52YXIgT2JqID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9iaihjb2xvciwgaW5pdGlhbFBvc1ZlY3RvciwgaW5pdGl0YWxWZWxvY2l0eSwgaW5pdGlhbEFjY2VsZXJhdGlvbiwgbWFzcykge1xuICAgICAgICAvLyBrZ1xuICAgICAgICB0aGlzLm1hc3MgPSAwO1xuICAgICAgICAvLyBtLG1cbiAgICAgICAgdGhpcy5wb3NJbml0aWFsID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCk7XG4gICAgICAgIC8vIG0sbVxuICAgICAgICB0aGlzLnBvcyA9IG5ldyBWZWN0b3JfMS5kZWZhdWx0KDAsIDApO1xuICAgICAgICAvLyBtLG1cbiAgICAgICAgdGhpcy5sYXN0UG9zID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCk7XG4gICAgICAgIC8vIG0vc1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCk7XG4gICAgICAgIC8vIG0sc14yXG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCk7XG4gICAgICAgIC8vIG1cbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IDA7XG4gICAgICAgIC8vIGtnL21cbiAgICAgICAgdGhpcy5kZW5zaXR5ID0gMTtcbiAgICAgICAgdGhpcy50aGV0YSA9IDA7XG4gICAgICAgIHRoaXMub21lZ2EgPSAwO1xuICAgICAgICB0aGlzLmFscGhhID0gMDtcbiAgICAgICAgLy8gdGhlIGNoYXJnZSBvZiBhIHBhcnRpY2xlLCBtZWFzdXJlZCBpbiBjb3VsdW1ic1xuICAgICAgICB0aGlzLmNoYXJnZSA9IDA7XG4gICAgICAgIHRoaXMua2luZXRpY0ZyaWN0aW9uQ29lZmZpY2llbnQgPSAwO1xuICAgICAgICB0aGlzLnN0YXRpY0ZyaWN0aW9uQ29lZmZpY2llbnQgPSAwO1xuICAgICAgICAvLyB0aGUgY29sb3Igb2YgdGhlIG9iamVjdFxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3IgIT09IG51bGwgJiYgY29sb3IgIT09IHZvaWQgMCA/IGNvbG9yIDogXCJibGFja1wiO1xuICAgICAgICAvLyB0aGUgbWFzcyBvZiB0aGUgb2JqZWN0XG4gICAgICAgIHRoaXMubWFzcyA9IG1hc3MgIT09IG51bGwgJiYgbWFzcyAhPT0gdm9pZCAwID8gbWFzcyA6IDEwMDA7XG4gICAgICAgIC8vIHRoZSBpbml0aWFsIHBvc2l0aW9uIChmb3IgY2FsY3VsYXRpbmcgZGlzcGxhY2VtZW50KVxuICAgICAgICB0aGlzLnBvc0luaXRpYWwgPSBpbml0aWFsUG9zVmVjdG9yICE9PSBudWxsICYmIGluaXRpYWxQb3NWZWN0b3IgIT09IHZvaWQgMCA/IGluaXRpYWxQb3NWZWN0b3IgOiBuZXcgVmVjdG9yXzEuZGVmYXVsdCgwLCAwKTtcbiAgICAgICAgLy8gdGhlIHBvc2l0aW9uIG9mIHRoZSBvYmplY3Qge1ZlY3Rvcn1cbiAgICAgICAgdGhpcy5wb3MgPSBpbml0aWFsUG9zVmVjdG9yICE9PSBudWxsICYmIGluaXRpYWxQb3NWZWN0b3IgIT09IHZvaWQgMCA/IGluaXRpYWxQb3NWZWN0b3IgOiBuZXcgVmVjdG9yXzEuZGVmYXVsdCgwLCAwKTtcbiAgICAgICAgLy8gdGhlIGxhc3QgcG9zaXRpb24gKGZvciBjYWxjdWxhdGluZyBkZWx0YSBkaXN0YW5jZSlcbiAgICAgICAgdGhpcy5sYXN0UG9zID0gaW5pdGlhbFBvc1ZlY3RvciAhPT0gbnVsbCAmJiBpbml0aWFsUG9zVmVjdG9yICE9PSB2b2lkIDAgPyBpbml0aWFsUG9zVmVjdG9yIDogbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCk7XG4gICAgICAgIC8vIHRoZSB2ZWxvY2l0eSBvZiB0aGUgb2JqZWN0IHtWZWN0b3J9XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBpbml0aXRhbFZlbG9jaXR5ICE9PSBudWxsICYmIGluaXRpdGFsVmVsb2NpdHkgIT09IHZvaWQgMCA/IGluaXRpdGFsVmVsb2NpdHkgOiBuZXcgVmVjdG9yXzEuZGVmYXVsdCgwLCAwKTtcbiAgICAgICAgLy8gdGhlIGFjY2VsZXJhdGlvbiBvZiB0aGUgb2JqZWN0IHtWZWN0b3J9XG4gICAgICAgIHRoaXMuYWNjZWxlcmF0aW9uID0gaW5pdGlhbEFjY2VsZXJhdGlvbiAhPT0gbnVsbCAmJiBpbml0aWFsQWNjZWxlcmF0aW9uICE9PSB2b2lkIDAgPyBpbml0aWFsQWNjZWxlcmF0aW9uIDogbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCk7XG4gICAgICAgIC8vIHRoZSBhbW91bnQgb2YgdG90YWwgZGlzdGFuY2UgdHJhdmVsZWQ6XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAwO1xuICAgICAgICAvLyBmaXhlcyB0aGUgcG9zaXRpb24gb2YgYW4gb2JqZWN0IGluIHNwYWNlXG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XG4gICAgICAgIC8vIGZvciByb3RhdGlvbnM6XG4gICAgICAgIC8vIHRoZSByb3RhdGlvbiBvZiB0aGUgb2JqZWN0LCByZWxhdGl2ZSB0byBpdHMgY2VudGVyIG9mIG1hc3NcbiAgICAgICAgLy8gYW5ndWxhciBhY2NlbGVyYXRpb24sIGFuZ3VsYXIgdmVsb2NpdHksIGFuZCBhbmd1bGFyIHBvc1xuICAgICAgICAvLyBhbGwgbWVhc3VyZWQgaW4gcmFkaWFucy9zZWNcbiAgICAgICAgdGhpcy50aGV0YSA9IDA7XG4gICAgICAgIHRoaXMub21lZ2EgPSAwO1xuICAgICAgICB0aGlzLmFscGhhID0gMDtcbiAgICB9XG4gICAgT2JqLnByb3RvdHlwZS52b2x1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hc3MgLyB0aGlzLmRlbnNpdHk7XG4gICAgfTtcbiAgICBPYmoucHJvdG90eXBlLnJhZGl1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KCgzIC8gKDQgKiBNYXRoLlBJKSkgKiB0aGlzLnZvbHVtZSgpLCAxIC8gMyk7XG4gICAgfTtcbiAgICAvLyBzZXRzIHRoZSBkaXNwbGFjZW1lbnQgdG8gemVyby5cbiAgICBPYmoucHJvdG90eXBlLnJlc2V0RGlzcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBvc0luaXRpYWwgPSB0aGlzLnBvcztcbiAgICB9O1xuICAgIC8vIGdldHMgaXRzIGRpc3BsYWNlbWVudFxuICAgIE9iai5wcm90b3R5cGUuZGlzcGxhY2VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gVmVjdG9yXzEuZGVmYXVsdC5TdWJ0cmFjdCh0aGlzLnBvcywgdGhpcy5wb3NJbml0aWFsKTtcbiAgICB9O1xuICAgIC8vIHJldHVybnMgdGhlIGtpbmV0aWMgZW5lcmd5IG9mIHRoZSBvYmplY3RcbiAgICBPYmoucHJvdG90eXBlLmtpbmV0aWNFbmVyZ3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAuNSAqIHRoaXMubWFzcyAqIE1hdGgucG93KHRoaXMudmVsb2NpdHkubWFnbml0dWRlLCAyKTtcbiAgICB9O1xuICAgIE9iai5wcm90b3R5cGUubW9tZW50dW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZlbG9jaXR5Lm11bHRpcGx5QnlTY2FsYXIodGhpcy5tYXNzKTtcbiAgICB9O1xuICAgIC8vIHVwZGF0ZXMgdGhlIGFjY2VsZXJhdGlvbiwgdmVsb2NpdHksICYgcG9zaXRpb24gb2YgdGhlIG9iamVjdCB3aXRoIHJlc3BlY3QgdG8gZGVsdGEgdGltZVxuICAgIC8vIGNhbGN1bGF0ZXMgdGhlIGFjY2VsZXJhdGlvbiBvbiB0aGUgb2JqZWN0IGZyb20gYWxsIG9mIHRoZSBmb3JjZXNcbiAgICBPYmoucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xuICAgICAgICBpZiAodGhpcy5sb2NrZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RQb3MgPSB0aGlzLnBvcztcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IFZlY3Rvcl8xLmRlZmF1bHQuQWRkKHRoaXMudmVsb2NpdHksIHRoaXMuYWNjZWxlcmF0aW9uLCBkdCk7XG4gICAgICAgIHRoaXMucG9zID0gVmVjdG9yXzEuZGVmYXVsdC5BZGQodGhpcy5wb3MsIHRoaXMudmVsb2NpdHksIGR0KTtcbiAgICAgICAgLy8gZm9yIHJvdGF0aW9uYWwgbW90aW9uLFxuICAgICAgICB0aGlzLm9tZWdhICs9IHRoaXMuYWxwaGEgKiBkdDtcbiAgICAgICAgdGhpcy50aGV0YSArPSB0aGlzLm9tZWdhICogZHQ7XG4gICAgICAgIC8vIGFkZCB0byB0aGUgdG90YWwgZGlzdGFuY2Ugb2YgdGhlIG9iamVjdCBob3cgbXVjaCBpdCBpcyB0cmF2ZWxpbmcuXG4gICAgICAgIHRoaXMuZGlzdGFuY2UgKz0gdGhpcy52ZWxvY2l0eS5tYWduaXR1ZGUgKiBkdDtcbiAgICB9O1xuICAgIC8vIGRyYXdzIHRoZSBvYmplY3QgYW5kIG90aGVyIGluZm9ybWF0aW9uIG9uIHRoZSBzY3JlZW5cbiAgICBPYmoucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgKDAsIFJlbmRlcl8xLmRyYXdPYmopKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIE9iajtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBPYmo7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY2xlYXJDYW52YXMgPSBleHBvcnRzLmRyYXdWZWN0b3JTdGF0ID0gZXhwb3J0cy5yZW5kZXJNb3VzZSA9IGV4cG9ydHMuZHJhd09iaiA9IGV4cG9ydHMuZHJhd09iamVjdFN0YXRzID0gZXhwb3J0cy5kcmF3VmVjdG9yID0gZXhwb3J0cy5kcmF3UG9pbnQgPSBleHBvcnRzLmRyYXdHcmlkID0gZXhwb3J0cy5nbG9iYWxPcmlnaW5WZWN0b3IgPSB2b2lkIDA7XG52YXIgQ29vcmRpbmF0ZV8xID0gcmVxdWlyZShcIi4vQ29vcmRpbmF0ZVwiKTtcbnZhciBWZWN0b3JfMSA9IHJlcXVpcmUoXCIuL1ZlY3RvclwiKTtcbnZhciBjb250cm9sc18xID0gcmVxdWlyZShcIi4vR3Jhdml0eS9jb250cm9sc1wiKTtcbnZhciBNYWluXzEgPSByZXF1aXJlKFwiLi9NYWluXCIpO1xudmFyIE9ial8xID0gcmVxdWlyZShcIi4vT2JqXCIpO1xuLy8gdGhlIGNhbnZhcyBhIHJlbmRlcmluZyBjb250ZXh0XG52YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG52YXIgYyA9IChfYSA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG51bGw7XG4vLyBUT0RPOiBkZXByZWNhdGVkIHdpbGwgYmUgcmVtb3ZlZFxuZXhwb3J0cy5nbG9iYWxPcmlnaW5WZWN0b3IgPSBuZXcgVmVjdG9yXzEuZGVmYXVsdCgwLCAwKTtcbmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbi8vIGRyYXdzIGEgZ3JpZCBzbyBpdCBpcyBlYXNpZXIgdG8gc2VlIGFuIG9iamVjdHMgbW90aW9uXG5mdW5jdGlvbiBkcmF3R3JpZCgpIHtcbiAgICBpZiAoIWNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5HcmlkLnZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgYy5iZWdpblBhdGgoKTtcbiAgICAvLyBjLnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAvLyBjLnRyYW5zbGF0ZShjb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueCwgY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLnkpXG4gICAgYy5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjLmxpbmVXaWR0aCA9IDE7XG4gICAgdmFyIHVuaXRzID0gW1xuICAgICAgICBcIm1tXCIsIFwiY21cIiwgXCJtXCIsIFwia21cIlxuICAgIF07XG4gICAgdmFyIGkgPSAyO1xuICAgIHZhciBzID0gY29udHJvbHNfMS5jb250cm9scy5WaWV3Llpvb20udmFsdWU7XG4gICAgaWYgKCFzKSB7XG4gICAgICAgIHMgPSAxO1xuICAgIH1cbiAgICAvLyBvcHRpbWl6ZSBncmlkIGRyYXdpbmcsIFxuICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHMgPCAxLCBjaGFuZ2UgdGhlIHVuaXRzIGZyb20gbV4yIHRvIGttXjIsIHRoZW4gc28gb24gYW5kIHNvIGZvcnRoXG4gICAgd2hpbGUgKHMgPD0gMSkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIHMgKj0gMTA7XG4gICAgfVxuICAgIGZvciAodmFyIFkgPSAwOyBZIDwgY2FudmFzLmhlaWdodDsgWSArPSBzKSB7XG4gICAgICAgIGMubW92ZVRvKDAsIFkpO1xuICAgICAgICBjLmxpbmVUbyhjYW52YXMud2lkdGgsIFkpO1xuICAgIH1cbiAgICBjLnN0cm9rZSgpO1xuICAgIGZvciAodmFyIFggPSAwOyBYIDwgY2FudmFzLndpZHRoOyBYICs9IHMpIHtcbiAgICAgICAgYy5tb3ZlVG8oWCwgMCk7XG4gICAgICAgIGMubGluZVRvKFgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbiAgICBjLnN0cm9rZSgpO1xuICAgIC8vIGRyYXcgaW4gdGhlIGJvdHRvbSByaWdodCBjb3JuZXIgdGhlIHNpemUgb2YgZWFjaCBzcXVhcmVcbiAgICBjLmZpbGxUZXh0KFwiMSB4IDEgXCIuY29uY2F0KHVuaXRzW2ldLCBcIl4yXCIpLCBjYW52YXMud2lkdGggLSA1MCwgY2FudmFzLmhlaWdodCAtIDIwKTtcbn1cbmV4cG9ydHMuZHJhd0dyaWQgPSBkcmF3R3JpZDtcbi8vIGRyYXdzIGEgZG90IG9uIHRoZSBzY3JlZW4gYXQgYSBjZXJ0YWluIHBvaW50XG5mdW5jdGlvbiBkcmF3UG9pbnQoeCwgeSwgY29sb3IpIHtcbiAgICBpZiAoY29sb3IgPT09IHZvaWQgMCkgeyBjb2xvciA9IFwiYmxhY2tcIjsgfVxuICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgYy5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgYy50cmFuc2xhdGUoY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueCwgY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueSk7XG4gICAgYy5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjLmZpbGxSZWN0KHgsIGNhbnZhcy5oZWlnaHQgLSB5LCAxMCwgMTApO1xufVxuZXhwb3J0cy5kcmF3UG9pbnQgPSBkcmF3UG9pbnQ7XG4vLyBkcmF3cyBhIHZlY3RvciB3aXRoIGl0cyBtYWduaXR1ZGUgaW4gcGl4ZWxzIGZyb20gdGhlIG9yaWdpblxuZnVuY3Rpb24gZHJhd1ZlY3Rvcih2ZWN0b3IsIGNvbG9yLCBvcmlnaW4pIHtcbiAgICBpZiAoY29sb3IgPT09IHZvaWQgMCkgeyBjb2xvciA9IFwiYmxhY2tcIjsgfVxuICAgIGlmIChvcmlnaW4gPT09IHZvaWQgMCkgeyBvcmlnaW4gPSBleHBvcnRzLmdsb2JhbE9yaWdpblZlY3RvcjsgfVxuICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgYy5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgYy50cmFuc2xhdGUoY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueCwgY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueSk7XG4gICAgYy5saW5lV2lkdGggPSAxO1xuICAgIGMuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICB2YXIgb3JpZ2luQ29vcmQgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKG9yaWdpbik7XG4gICAgYy5tb3ZlVG8ob3JpZ2luQ29vcmQueCAqIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlLCBjYW52YXMuaGVpZ2h0IC0gb3JpZ2luQ29vcmQueSAqIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlKTtcbiAgICB2YXIgeCA9IC12ZWN0b3IuZ2V0WENvbXBvbmVudCgpO1xuICAgIHZhciB5ID0gdmVjdG9yLmdldFlDb21wb25lbnQoKTtcbiAgICBjLmxpbmVUbyhvcmlnaW5Db29yZC54ICogY29udHJvbHNfMS5jb250cm9scy5WaWV3Llpvb20udmFsdWUgLSB4LCBjYW52YXMuaGVpZ2h0IC0geSAtIG9yaWdpbkNvb3JkLnkgKiBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuWm9vbS52YWx1ZSk7XG4gICAgYy5zdHJva2UoKTtcbn1cbmV4cG9ydHMuZHJhd1ZlY3RvciA9IGRyYXdWZWN0b3I7XG4vLyBkcmF3cyB0aGUgc3RhdGlzdGljcyBvZiBhbiBvYmplY3RcbmZ1bmN0aW9uIGRyYXdPYmplY3RTdGF0cyhwLCB2LCBhKSB7XG4gICAgdmFyIF9hID0gQ29vcmRpbmF0ZV8xLmRlZmF1bHQuRnJvbVZlY3RvcihwKSwgeCA9IF9hLngsIHkgPSBfYS55O1xuICAgIHkgPSBjYW52YXMuaGVpZ2h0IC0geTtcbiAgICBjLmJlZ2luUGF0aCgpO1xuICAgIGMuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIGMudHJhbnNsYXRlKGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLngsIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLnkpO1xuICAgIGMuZm9udCA9IFwiYm9sZCAzMHB4IHNlcmlmXCI7XG4gICAgYy5maWxsVGV4dChcIlBvczogXCIgKyBwLnJlYWRhYmxlKCkgKyBcIiwgVjogXCIgKyB2LnJlYWRhYmxlKCkgKyBcIiwgYTogXCIgKyBhLnJlYWRhYmxlKCksIHgsIHkpO1xufVxuZXhwb3J0cy5kcmF3T2JqZWN0U3RhdHMgPSBkcmF3T2JqZWN0U3RhdHM7XG4vLyBkcmF3cyBhbiBvYmplY3Qgd2l0aCBpdHMgbWFzcyBhcyB0aGUgcmFkaXVzXG5mdW5jdGlvbiBkcmF3T2JqKG9iamVjdCwgZmlsbCkge1xuICAgIGlmIChmaWxsID09PSB2b2lkIDApIHsgZmlsbCA9IHRydWU7IH1cbiAgICBjLmJlZ2luUGF0aCgpO1xuICAgIGMuc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIGMudHJhbnNsYXRlKGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLngsIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5WaWV3X0Nvb3JkaW5hdGVzLnkpO1xuICAgIC8vIGMuZmlsbFN0eWxlID0gb2JqZWN0LmNvbG9yXG4gICAgaWYgKG9iamVjdC5jaGFyZ2UgPCAwKSB7XG4gICAgICAgIGMuZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JqZWN0LmNoYXJnZSA+IDApIHtcbiAgICAgICAgYy5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGMuZmlsbFN0eWxlID0gb2JqZWN0LmNvbG9yO1xuICAgIH1cbiAgICBjLmxpbmVXaWR0aCA9IDU7XG4gICAgYy5zdHJva2VTdHlsZSA9IG9iamVjdC5jb2xvcjtcbiAgICB2YXIgX2EgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKG9iamVjdC5wb3MpLCB4ID0gX2EueCwgeSA9IF9hLnk7XG4gICAgYy5hcmMoeCAqIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlLCBjYW52YXMuaGVpZ2h0IC0geSAqIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlLCBvYmplY3QucmFkaXVzKCkgKiBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuWm9vbS52YWx1ZSwgMCwgMiAqIE1hdGguUEkpO1xuICAgIGlmIChmaWxsKSB7XG4gICAgICAgIGMuZmlsbCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYy5zdHJva2UoKTtcbiAgICB9XG4gICAgaWYgKGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5TaG93X1ZlbG9jaXR5X1ZlY3RvcilcbiAgICAgICAgZHJhd1ZlY3RvcihvYmplY3QudmVsb2NpdHkubXVsdGlwbHlCeVNjYWxhcihjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuWm9vbS52YWx1ZSksIFwiZ3JlZW5cIiwgb2JqZWN0LnBvcyk7XG4gICAgaWYgKGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5TaG93X0FjY2VsZXJhdGlvbl9WZWN0b3IpXG4gICAgICAgIGRyYXdWZWN0b3Iob2JqZWN0LmFjY2VsZXJhdGlvbi5tdWx0aXBseUJ5U2NhbGFyKGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlKSwgXCJyZWRcIiwgb2JqZWN0LnBvcyk7XG4gICAgLy8gbm93IGRyYXcgYSBibGFjayBsaW5lIGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIHJvdGF0aW9uIG9mIHRoZSBvYmplY3QuXG4gICAgYy5zdHJva2VTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICBjLm1vdmVUbyh4ICogY29udHJvbHNfMS5jb250cm9scy5WaWV3Llpvb20udmFsdWUsIGNhbnZhcy5oZWlnaHQgLSB5ICogY29udHJvbHNfMS5jb250cm9scy5WaWV3Llpvb20udmFsdWUpO1xuICAgIGMubGluZVRvKHggKiBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuWm9vbS52YWx1ZSArIG9iamVjdC5yYWRpdXMoKSAqIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlICogTWF0aC5jb3Mob2JqZWN0LnRoZXRhKSwgY2FudmFzLmhlaWdodCAtIHkgKiBjb250cm9sc18xLmNvbnRyb2xzLlZpZXcuWm9vbS52YWx1ZSArIG9iamVjdC5yYWRpdXMoKSAqIGNvbnRyb2xzXzEuY29udHJvbHMuVmlldy5ab29tLnZhbHVlICogTWF0aC5zaW4ob2JqZWN0LnRoZXRhKSk7XG4gICAgYy5zdHJva2UoKTtcbn1cbmV4cG9ydHMuZHJhd09iaiA9IGRyYXdPYmo7XG5mdW5jdGlvbiByZW5kZXJNb3VzZSgpIHtcbiAgICB2YXIgb2JqID0gbmV3IE9ial8xLmRlZmF1bHQoXCJibGFja1wiLCBNYWluXzEubW91c2VWZWN0b3IsIG5ldyBWZWN0b3JfMS5kZWZhdWx0KGNvbnRyb2xzXzEuY29udHJvbHNbXCJPYmplY3RcIl1bXCJWZWxvY2l0eVwiXS5tYWduaXR1ZGUsIGNvbnRyb2xzXzEuY29udHJvbHNbXCJPYmplY3RcIl1bXCJWZWxvY2l0eVwiXS5kaXJlY3Rpb24gLyAxODAgKiBNYXRoLlBJKSwgbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCksIGNvbnRyb2xzXzEuY29udHJvbHNbXCJPYmplY3RcIl1bXCJNYXNzXCJdW1widmFsdWVcIl0pO1xuICAgIG9iai5kZW5zaXR5ID0gY29udHJvbHNfMS5jb250cm9scy5PYmplY3QuRGVuc2l0eS52YWx1ZTtcbiAgICBkcmF3T2JqKG9iaiwgZmFsc2UpO1xufVxuZXhwb3J0cy5yZW5kZXJNb3VzZSA9IHJlbmRlck1vdXNlO1xuLy8gZHJhd3MgYSB2ZWN0b3IgYXQgbG9jYXRpb24gdlxuZnVuY3Rpb24gZHJhd1ZlY3RvclN0YXQodiwgY29sb3IpIHtcbiAgICB2YXIgX2EgPSBDb29yZGluYXRlXzEuZGVmYXVsdC5Gcm9tVmVjdG9yKHYpLCB4ID0gX2EueCwgeSA9IF9hLnk7XG4gICAgeSA9IGNhbnZhcy5oZWlnaHQgLSB5O1xuICAgIGMuYmVnaW5QYXRoKCk7XG4gICAgYy5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgYy50cmFuc2xhdGUoY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueCwgY29udHJvbHNfMS5jb250cm9scy5WaWV3LlZpZXdfQ29vcmRpbmF0ZXMueSk7XG4gICAgYy5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGMuZm9udCA9IFwiYm9sZCAzMHB4IHNlcmlmXCI7XG4gICAgYy5maWxsVGV4dCh2LnJlYWRhYmxlKCksIHgsIHkpO1xufVxuZXhwb3J0cy5kcmF3VmVjdG9yU3RhdCA9IGRyYXdWZWN0b3JTdGF0O1xuZnVuY3Rpb24gY2xlYXJDYW52YXMoKSB7XG4gICAgLy8gcmVzZXQgdGhlIHRyYW5zZm9ybWF0aW9uXG4gICAgYy5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgLy8gY2xlYXIgdGhlIHNjcmVlbiBldmVyeSBmcmFtZVxuICAgIGMuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG5leHBvcnRzLmNsZWFyQ2FudmFzID0gY2xlYXJDYW52YXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBDb29yZGluYXRlXzEgPSByZXF1aXJlKFwiLi9Db29yZGluYXRlXCIpO1xudmFyIFZlY3RvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBkaXJlY3Rpb24gaXMgaW4gcmFkaWFuc1xuICAgIGZ1bmN0aW9uIFZlY3RvcihtLCBkKSB7XG4gICAgICAgIHRoaXMubWFnbml0dWRlID0gbTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkO1xuICAgIH1cbiAgICBWZWN0b3IucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChuVmVjdG9yKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gblZlY3Rvci5kaXJlY3Rpb247XG4gICAgICAgIHRoaXMubWFnbml0dWRlID0gblZlY3Rvci5tYWduaXR1ZGU7XG4gICAgfTtcbiAgICBWZWN0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCI8XCIuY29uY2F0KHRoaXMubWFnbml0dWRlLCBcIiwgXCIpLmNvbmNhdCh0aGlzLmRpcmVjdGlvbiwgXCI+XCIpO1xuICAgIH07XG4gICAgLy8gcmV0dXJucyBhIHVuaXQgdmVjdG9yXG4gICAgLy8gbWFpbnRhaW5zIGRpcmVjdGlvbiBidXQgaGFzIGEgbWFnbml0dWRlIG9mIDFcbiAgICBWZWN0b3IucHJvdG90eXBlLnVuaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKDEsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB9O1xuICAgIC8vIHJldHVybnMgYSBuZXcgdmVjdG9yIHdpdGggaXRzIG1hZ25pdHVkZSBtdWx0aXBsaWVkIGJ5IHNcbiAgICBWZWN0b3IucHJvdG90eXBlLm11bHRpcGx5QnlTY2FsYXIgPSBmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLm1hZ25pdHVkZSAqIHMsIHRoaXMuZGlyZWN0aW9uKTtcbiAgICB9O1xuICAgIC8vIHJldHVybnMgYSBuZXcgdmVjdG9yIHdpdGggaXRzIG1hZ25pdHVkZSBtdWx0aXBsaWVkIGJ5IHNcbiAgICBWZWN0b3IucHJvdG90eXBlLnBvd2VyID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoTWF0aC5wb3codGhpcy5tYWduaXR1ZGUsIHApLCB0aGlzLmRpcmVjdGlvbik7XG4gICAgfTtcbiAgICAvLyByZXR1cm5zIHRoZSBYIGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gICAgVmVjdG9yLnByb3RvdHlwZS5nZXRYQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWduaXR1ZGUgKiBNYXRoLmNvcyh0aGlzLmRpcmVjdGlvbik7XG4gICAgfTtcbiAgICAvLyByZXR1cm5zIHRoZSBZIGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gICAgVmVjdG9yLnByb3RvdHlwZS5nZXRZQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWduaXR1ZGUgKiBNYXRoLnNpbih0aGlzLmRpcmVjdGlvbik7XG4gICAgfTtcbiAgICAvLyBpcyB0aGUgbWFnbml0dWRlIDAgb3IgTmFuP1xuICAgIFZlY3Rvci5wcm90b3R5cGUuaXNOdWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYWduaXR1ZGUgPT0gMDtcbiAgICB9O1xuICAgIFZlY3Rvci5wcm90b3R5cGUuaXNOYU4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBOdW1iZXIuaXNOYU4odGhpcy5tYWduaXR1ZGUpO1xuICAgIH07XG4gICAgLy8gVE9ETzogaW5uZWZpY3RpZW50LlxuICAgIFZlY3Rvci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKHYyLCByb3VuZFRvKSB7XG4gICAgICAgIGlmIChyb3VuZFRvID09PSB2b2lkIDApIHsgcm91bmRUbyA9IDQ7IH1cbiAgICAgICAgcmV0dXJuIHYyLm1hZ25pdHVkZS50b0ZpeGVkKHJvdW5kVG8pID09IHRoaXMubWFnbml0dWRlLnRvRml4ZWQocm91bmRUbykgJiYgdjIuZGlyZWN0aW9uLnRvRml4ZWQocm91bmRUbykgPT0gdGhpcy5kaXJlY3Rpb24udG9GaXhlZChyb3VuZFRvKTtcbiAgICB9O1xuICAgIC8vIHJldHVybnMgYSBuZXcgdmVjdG9yIGJ1dCBwb2ludGluZyBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uXG4gICAgVmVjdG9yLnByb3RvdHlwZS5uZWdhdGl2ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy5tYWduaXR1ZGUsIHRoaXMuZGlyZWN0aW9uICsgTWF0aC5QSSk7XG4gICAgfTtcbiAgICAvLyBhZGRzIHR3byB2ZWN0b3JzLCB3aXRoIHRoZSBtYWduaXR1ZGUgb2YgYiBiZWluZyBtdWx0aXBsaWVkIGJ5IHNjYWxlXG4gICAgVmVjdG9yLkFkZCA9IGZ1bmN0aW9uIChhLCBiLCBzY2FsZSkge1xuICAgICAgICBpZiAoc2NhbGUgPT09IHZvaWQgMCkgeyBzY2FsZSA9IDE7IH1cbiAgICAgICAgaWYgKGEuaXNOdWxsKCkgfHwgYS5pc05hTigpKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiLmlzTnVsbCgpIHx8IGIuaXNOYU4oKSkge1xuICAgICAgICAgICAgcmV0dXJuIGE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHhDb21wb25lbnQgPSBhLmdldFhDb21wb25lbnQoKSArIGIuZ2V0WENvbXBvbmVudCgpICogc2NhbGU7XG4gICAgICAgIHZhciB5Q29tcG9uZW50ID0gYS5nZXRZQ29tcG9uZW50KCkgKyBiLmdldFlDb21wb25lbnQoKSAqIHNjYWxlO1xuICAgICAgICB2YXIgY29tYmluZWQgPSBNYXRoLnNxcnQoTWF0aC5wb3coeENvbXBvbmVudCwgMikgKyBNYXRoLnBvdyh5Q29tcG9uZW50LCAyKSk7XG4gICAgICAgIHZhciBkaXIgPSBNYXRoLmF0YW4yKHlDb21wb25lbnQsIHhDb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcihjb21iaW5lZCwgZGlyKTtcbiAgICB9O1xuICAgIC8vIHN1YnRyYWN0cyB0d28gdmVjdG9ycywgd2l0aCB0aGUgbWFnbml0dWRlIG9mIGIgYmVpbmcgbXVsdGlwbGllZCBieSBzY2FsZVxuICAgIFZlY3Rvci5TdWJ0cmFjdCA9IGZ1bmN0aW9uIChhLCBiLCBzY2FsZSkge1xuICAgICAgICBpZiAoc2NhbGUgPT09IHZvaWQgMCkgeyBzY2FsZSA9IDE7IH1cbiAgICAgICAgcmV0dXJuIFZlY3Rvci5BZGQoYSwgYi5uZWdhdGl2ZSgpLCBzY2FsZSk7XG4gICAgfTtcbiAgICBWZWN0b3IuRG90UHJvZHVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHZhciB0aGV0YSA9IFZlY3Rvci5TdWJ0cmFjdChhLCBiKS5kaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBhLm1hZ25pdHVkZSAqIGIubWFnbml0dWRlICogTWF0aC5jb3ModGhldGEpO1xuICAgIH07XG4gICAgVmVjdG9yLkNyb3NzUHJvZHVjdCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIC8vLyBUT0RPOiBtYWtlIHRoaXMgZnVuY3Rpb25cbiAgICB9O1xuICAgIC8vIGNvbnZlcnRzIGEgQ29vcmQgaW50byBhIHZlY3RvciwgcmVsYXRpdmUgdG8gcmVsYXRpdmVUb1xuICAgIFZlY3Rvci5Gcm9tQ29vcmQgPSBmdW5jdGlvbiAoY29vcmQsIHJlbGF0aXZlVG8pIHtcbiAgICAgICAgaWYgKHJlbGF0aXZlVG8gPT09IHZvaWQgMCkgeyByZWxhdGl2ZVRvID0gbmV3IENvb3JkaW5hdGVfMS5kZWZhdWx0KDAsIDApOyB9XG4gICAgICAgIHZhciBkaXIgPSBNYXRoLmF0YW4yKChjb29yZC55IC0gcmVsYXRpdmVUby55KSwgKGNvb3JkLnggLSByZWxhdGl2ZVRvLngpKSB8fCAwO1xuICAgICAgICB2YXIgbWFnID0gTWF0aC5zcXJ0KE1hdGgucG93KGNvb3JkLnkgLSByZWxhdGl2ZVRvLnksIDIpICsgTWF0aC5wb3coY29vcmQueCAtIHJlbGF0aXZlVG8ueCwgMikpO1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihtYWcsIGRpcik7XG4gICAgfTtcbiAgICByZXR1cm4gVmVjdG9yO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFZlY3RvcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9NYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9