const axios = require('axios')
const remote = require('electron').remote;
const { Menu, MenuItem, BrowserWindow } = remote
const Positioner = require('electron-positioner')
var positioner = new Positioner(remote.getCurrentWindow())

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
    // menu.popup(remote.getCurrentWindow())
    const window = remote.getCurrentWindow();
    window.close();
}, false)

const menu = new Menu()

// Build menu one item at a time, unlike
menu.append(new MenuItem({
    label: 'Close',
    click() {
        const window = remote.getCurrentWindow();
        window.close();
    }
}))
menu.append(new MenuItem({
    label: 'Settings',
    click() {
        // const modalPath = path.join('file://', __dirname, 'settings.html');
        let win = new BrowserWindow({ 
            height: 400, 
            width: 600,
            frame: false,
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        win.on('close', () => { win = null });
        win.loadFile('settings.html');
        win.show();
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

menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({
    label: 'Position',
    submenu: [
        {
            label: 'Top Left',
            click: () => {
                positioner.move('topLeft')
            }
        }, {
        label: 'Top Right',
            click: () => {
                positioner.move('topRight')
            }
        },
        {
            label: 'bottomLeft',
            click: () => {
                positioner.move('bottomLeft')
            }
        },
        {
            label: 'Bottom Right',
            click: () => {
                positioner.move('bottomRight')
            }
        },
        {
            label: 'Top Center',
            click: () => {
                positioner.move('topCenter')
            }
        },
        {
            label: 'Bottom Center',
            click: () => {
                positioner.move('bottomCenter')
            }
        },
        {
            label: 'Left Center',
            click: () => {
                positioner.move('leftCenter')
            }
        },
        {
            label: 'Right Center',
            click: () => {
                positioner.move('rightCenter')
            }
        },
        {
            label: 'Center',
            click: () => {
                positioner.move('center')
            }
        }
    ]
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
                            temp.innerHTML = response.data.currently.temperature + "<sup>o</sup>"
                            summary.innerHTML = response.data.currently.summary
                            icon.src = "./icons/" + response.data.currently.icon + ".svg"

                        })
                })
        })
        .catch(function (error) {
            console.log(error);
        });
}
