import { updateMap } from "./async-functions.js";

const $location = document.getElementById("location");
    const $lat = $location.querySelector(`[data-var="latitude"] var`);
    const $lon = $location.querySelector(`[data-var="longitude"] var`);

const $picture  = document.getElementById("picture");
    const $pic_input = $picture.querySelector("input");
    const $pic_zone = $picture.querySelector("main");

updateMap("map-zone", $lat, $lon);

$pic_input.addEventListener("change", event => {
    for(let file of event.target.files) {
        const image = new Image();
        image.classList.add("pic");
        image.src = URL.createObjectURL(file);
        $pic_zone.append(image);
        image.onload = () => URL.revokeObjectURL(image.src);
    }
});
