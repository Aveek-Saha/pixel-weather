const axios = require('axios')
var drag = require('electron-drag');
const remote = require('electron').remote;
const { Menu, MenuItem } = remote

const key = config.WEATHER_API_KEY
 
const IP_API_URL = "https://api.ipify.org/?format=json";
const LOCATION_API_URL = "https://www.iplocate.io/api/lookup/";
const WEATHER_API_URL = "https://api.darksky.net/forecast/"+ key +"/"
const WEATHER_PARAMS = "?exclude=[hourly,daily,minutely,alerts,flags,minutely]&units=auto"

var temp = document.getElementById("temp")
var summary = document.getElementById("summary")
var icon = document.getElementById("icon")
var location = document.getElementById("location")

getWeather()

document.getElementById("close-btn").addEventListener("click", (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false)

if (!drag.supported) {
    document.querySelector('#main').style['-webkit-app-region'] = 'drag';
}
else {
    var clear = drag('#main');
    clear();
}

const menu = new Menu()

// Build menu one item at a time, unlike
menu.append(new MenuItem({
    label: 'Close',
    click() {
        const window = remote.getCurrentWindow();
        window.close();
    }
}))

menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({
    label: 'Dark',
    type: 'checkbox', 
    checked: true,
    click() {
        if(this.checked == false){
            document.body.style.color = 'black'
            this.checked = true
        }
        else {
            document.body.style.color = 'white'
            this.checked = false
        }
    }
}))

// Prevent default action of right click in chromium. Replace with our menu.
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false)


function getWeather() {
    axios.get(IP_API_URL)
        .then(function (response) {
            const ip = response.data.ip
            console.log(response.data.ip);

            axios.get(LOCATION_API_URL + ip)
                .then(function (response) {
                    console.log([response.data.city, response.data.latitude, response.data.longitude]);
                    const longitude = response.data.longitude
                    const latitude = response.data.latitude

                    location.innerHTML = response.data.city


                    axios.get(WEATHER_API_URL + latitude + "," + longitude + WEATHER_PARAMS)
                        .then(function (response) {
                            console.log([response.data.currently.summary, response.data.currently.temperature, response.data.currently.icon]);
                            temp.innerHTML = response.data.currently.temperature
                            summary.innerHTML = response.data.currently.summary
                            icon.src = "./icons/" + response.data.currently.icon + ".svg"

                        })
                })
        })
        .catch(function (error) {
            console.log(error);
        });
}
