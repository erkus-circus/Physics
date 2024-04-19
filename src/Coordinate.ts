import Vector from "./Vector";
interface CoordinateType {
    x: number;
    y: number;
    z?: number;
}
export default class Coordinate implements CoordinateType {
    x: number;
    y: number;
    z?: number;
    
    constructor(X: number, Y: number, Z?: number) {
        this.x = X;
        this.y = Y;
        this.z = Z ?? 0;
    }

    
    static FromVector(v: Vector): Coordinate {
        return new Coordinate(v.getXComponent(), v.getYComponent())
    }

    static DistanceFrom(a: Coordinate, b: Coordinate): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }

}
