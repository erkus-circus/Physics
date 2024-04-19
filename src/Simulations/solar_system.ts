import { updateControl } from "../Controller";
import { objects } from "../Main";
import Obj from "../Obj";
import Vector from "../Vector";

interface Planet {
    name: string
    distance_from_sun_au: number
    orbital_speed_km_s: number
    diameter_km: number
    mass_kg: number
    interesting_facts: string
    color: string
}

function AU_To_M (AU: number): number {
    // 1 AU = 1.496e+11 meters
    return AU * 1.496E11;
}

// Google Bard results
let planets: Planet[] = JSON.parse('[{"name":" Sun","distance_from_sun_au":"0.00","orbital_speed_km_s":"0.00","diameter_km":"1391500","mass_kg":"1.989e+30","interesting_facts":"Central star of our solar system; source of light and heat","color":"yellow","__parsed_extra":[" orange"]},{"name":"Mercury","distance_from_sun_au":"0.39","orbital_speed_km_s":"47.4","diameter_km":"4879","mass_kg":"3.30e+23","interesting_facts":"Smallest and fastest planet; extreme temperature swings","color":"gray"},{"name":"Venus","distance_from_sun_au":"0.72","orbital_speed_km_s":"35.0","diameter_km":"12104","mass_kg":"4.87e+24","interesting_facts":"Thickest atmosphere; second hottest planet","color":"light yellow"},{"name":"Earth","distance_from_sun_au":"1.00","orbital_speed_km_s":"29.8","diameter_km":"12742","mass_kg":"5.97e+24","interesting_facts":"Only planet known to support life","color":"blue","__parsed_extra":[" green"," brown"]},{"name":"Mars","distance_from_sun_au":"1.52","orbital_speed_km_s":"24.1","diameter_km":"6779","mass_kg":"6.42e+23","interesting_facts":"Largest and most Earth-like inner planet; evidence of past water","color":"red","__parsed_extra":[" orange"," brown"]},{"name":"Jupiter","distance_from_sun_au":"5.20","orbital_speed_km_s":"13.1","diameter_km":"142800","mass_kg":"1.898e+27","interesting_facts":"Largest planet in solar system; has a Great Red Spot larger than Earth","color":"light orange","__parsed_extra":[" white"," brown"," dark orange"]},{"name":"Saturn","distance_from_sun_au":"9.58","orbital_speed_km_s":"9.1","diameter_km":"120660","mass_kg":"5.683e+26","interesting_facts":"Second largest planet; famous for its rings made of ice and dust","color":"light brown","__parsed_extra":[" yellow"]},{"name":"Uranus","distance_from_sun_au":"19.18","orbital_speed_km_s":"6.8","diameter_km":"51118","mass_kg":"1.345e+25","interesting_facts":"Tilted on its side; icy giant with faint rings","color":"pale blue"},{"name":"Neptune","distance_from_sun_au":"30.06","orbital_speed_km_s":"5.4","diameter_km":"49528","mass_kg":"1.036e+25","interesting_facts":"Farthest planet; icy giant with strong winds and dark spot","color":"royal blue","__parsed_extra":[" blue"]}]')
 
export default function solarSystemSim(): Obj[] {
    let system: Obj[] = []



    planets.forEach((p) => {
        // 
        let o = new Obj()
        o.pos = new Vector(AU_To_M(p.distance_from_sun_au), 0)
        console.log(o.pos.magnitude * 1E-13);
        
        // * 1000 to convert it into meters per second.
        o.velocity = new Vector(p.orbital_speed_km_s * 1000, Math.PI / 2)
        // * 1000 to convert kg into grams
        o.mass = p.mass_kg * 1000
        o.color = p.color


        // adjust until the planets are visible.
        // that number is the largest mass (the sun)
        o.density = o.mass / 1.989e+30
        updateControl("View.Zoom", Math.pow(10, -13))

        system.push(o)
    })
    
    return system
}