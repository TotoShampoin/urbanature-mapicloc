/**
 * @returns {Promise<GeolocationPosition>}
 */
export const geolocate = () => new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
});

/**
 * @param {string} map_id 
 * @param {HTMLElement} $lat 
 * @param {HTMLElement} $lon 
 */
export const updateMap = async (map_id, $lat, $lon) => {
    const geo = await geolocate();
    const {latitude, longitude} = geo.coords;
    $lat.innerText = `${latitude}`;
    $lon.innerText = `${longitude}`;

    const map = L.map(map_id).setView([latitude, longitude], 12);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoidG90b3NoYW1wb2luIiwiYSI6ImNrejVjYWFhaDBpM3Iyb3VzdnRya3lldnoifQ.amZr9j2b4tj-yVWiFOMiqw"
    }).addTo(map);
    L.marker([latitude, longitude]).addTo(map);
};
