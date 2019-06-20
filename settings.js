const electron = require('electron')
const path = require('path')
const storage = require('electron-json-storage');

const remote = electron.remote
const ipc = electron.ipcRenderer

const updateBtn = document.getElementById('updateBtn')

const api = document.getElementById('api')
storage.get('settings', function (error, data) {
    if (error) throw error;

    console.log(data.api == undefined);
    if (data.api == undefined)
        api.innerHTML = ""
    else {
        api.innerHTML = data.api
    }

});

updateBtn.addEventListener('click', () => {
    
    ipc.send('update', {
        "refresh": document.getElementById('refresh').value,
        "api": document.getElementById('api').value
    })

    var window = remote.getCurrentWindow();
    window.close();
})