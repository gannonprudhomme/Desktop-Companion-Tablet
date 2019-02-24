const currentView = 'volume-mixer' // ENUM here, volume-mixer, or pc-stats, or pomdo

const socket = require('socket.io-client')('http://localhost:3000')

let settings = {}
let moduleKeys = []

let displayInitialized = false
let connectedToServer = false

$(document).ready(function() {
  console.log('Display: Attempting to get settings, connected: ' + socket.connected)
  // Retrieve the settings from the server
  socket.emit('settings', '', function(data) {
    console.log('Display: Retrieved Settings & Initialized!')
    settings = data;
    moduleKeys = settings['modules']

    // Once we've received the settings data, call intialSetup
    hideOtherModules(settings['startModule'])

    // Create all of the bottom-right module switch icons
    for(let i = 0; i < moduleKeys.length; i++) {
      createModuleToggle(moduleKeys[i])
    }

    displayInitialized = true
  })

  const timer = setInterval(function() {
    if(Object.keys(settings).length > 0) {
      console.log('Display: Initialized in loop')
      moduleKeys = settings['modules']

      // Once we've received the settings data, call intialSetup
      hideOtherModules(settings['startModule'])

      // Create all of the bottom-right module switch icons
      for(let i = 0; i < moduleKeys.length; i++) {
        createModuleToggle(moduleKeys[i])
      }

      clearInterval(timer)
    }
  }, 300)

  // Check if we're connected every 2.5 seconds
  const delay = 2500
  setInterval(() => {
    checkIfConnected()
  }, delay)
})

$('#power-button').click(function() {
  desktopPut('sleep')
})

$('#mute-microphone').click(function() {
  socket.emit('discord', 'mute')
})

$('#screenshot').click(function() {
  socket.emit('screenshot', '')
})

// Generate the click action-listener for the toggle-buttons to show the according module
function createModuleToggle(id) {
  $('#' + id + '-toggle').click(function() {
    hideOtherModules(id)
  })
}

function desktopPut(urlExtension) {
  console.log('sending ' + urlExtension)
  const instance = axios.create({
    baseURL: 'http://192.168.1.78:3000/desktop/' + urlExtension,
    timeout: 3000,
  })

  instance.put('', {}).then(function(response) {

  }).catch(function(error) {
    console.log(error);
  })
}

function hideOtherModules(moduleToShow) {
  // If we're connected to the server, show/hide whatever module
  if(connectedToServer) {
    for(let i = 0; i < moduleKeys.length; i++) {
      const key = moduleKeys[i]

      if(key != moduleToShow) {
        $('#' + key).hide()
      }
    }

    $('#' + moduleToShow).show()
  } else {
    // If we're not connected to the server, only show the modules that don't require it
    if(!doesRequireServer(moduleToShow)) {
      for(let i = 0; i < moduleKeys.length; i++) {
        const key = moduleKeys[i]

        if(key != moduleToShow) {
          $('#' + key).hide()
        }
      }

      $('#' + moduleToShow).show()
    }
  }
}

// Check if we're currently connected to a (windows 10) companion server
function checkIfConnected() {
  socket.emit('connectedToServer', '', (data) => {
    connectedToServer = data
    hideShowServerModules(!connectedToServer)

    if(connectedToServer) {
      console.log('Showing server modules')
    } else {
      console.log('Hiding server modules')
    }
  })
}

function doesRequireServer(module) {
  if(settings) {
    const currentModules = settings['currentModules']

    for(const i in currentModules) {
      if(Object.prototype.hasOwnProperty.call(currentModules, i)) {
        const module = currentModules[i]

        if(module['id'] == module) {
          return module['requires-server']
        }
      }
    }
  }
}

// Remove the modules that require the server
function hideShowServerModules(hide) {
  if(settings) { // If the settings are loaded in
    const currentModules = settings['currentModules']

    for(const i in currentModules) {
      if(Object.prototype.hasOwnProperty.call(currentModules, i)) {
        const module = currentModules[i]
        const id = module['id']

        if(module['requires-server']) {
          if(hide) {
            console.log('Hiding ' + id)
            $('#' + id).hide()
            $('#' + id + '-toggle').hide()

          } else {
            $('#' + id).show()
            $('#' + id + '-toggle').show()
          }
        } else {
          console.log(id + ' doesnt need server')
        }
      }
    }
  }
}

function updateClock() {
  const now = new Date() // current date

  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const time = hours + ':' + minutes + ' ' + ampm;

  // set the content of the element with the ID time to the formatted string
  document.getElementById('time').innerHTML = time;

  // call this function again in 1000ms
  setTimeout(updateClock, 1000);
}

updateClock(); // initial call
