# Desktop Control Tablet
[![Build Status](https://travis-ci.com/gannonprudhomme/Desktop-Control-Tablet.svg?branch=master)](https://travis-ci.com/gannonprudhomme/Desktop-Control-Tablet) <br>
A Desktop Companion Tablet built to control my Windows 10 home computer with a Raspberry Pi and touch screen. Focuses on modularity and customizability to allow easy addition and swapping of "modules" and other components. Pairs with the [Companion Server](https://github.com/gannonprudhomme/Desktop-Control-Tablet-Server).

![Screenshot](screenshots/screenshot1.png)

## Features
- Live Spotify current track display and playback control
- Built in remote volume mixer control for any desktop program
- Change current audio output device
- Live desktop performance(CPU, memory) display
- Modular, which allows any practically any control-feature to be implemented and inserted easily
- Wireless Smart Bulb control and synchronization with f.lux
- Live current weather display and updates

## Set up and usage
1) Install node.js/npm on your Raspberry Pi.
2) Clone the repository in the folder of your choosing. For ease of use, I'd suggest putting it in the `/home/pi/` or desktop folder.
3) After the entering repo folder, run ```npm install``` to install all of the relevant packages.
4) Due to an Electron/npm permission error, you will need to change the installation location of node modules. To do this, run `npm config edit` and insert `prefx=/home/pi/.npm-global`.
5) Install Electron by running `npm install -g electron@3.0.13`.
6) Set the local IP of your Pi in the `host-ip` field of ```view-settings.json```.
7) If you want to use the Volume Mixer and Performance Stats modules, download and install the [Windows 10 companion server](https://github.com/gannonprudhomme/Desktop-Control-Tablet-Server) on your host computer.
8) Optionally, in ```view-settings.json``` swap out the included modules that you want to use by first adding/removing their id's in the `modules` array, then by adding/removing their information in `currentModules`.
9) For ease of use, create a `.sh` file on the Pi and add this:

```bash
  cd /absolute/path/Desktop-Control-Tablet/ # Navigate to the repository location, using its absolute path so we can run it on startup
  export DISPLAY=:0 # Set the current display to the touch screen
  xhost +SI:localuser:root # Give sudo(root) access to the display
  sudo npm start & # Start the server(as root, to give access to rpi_backlight package)
```
9) On first launch, you will be redirected to authenticate with Spotify. If you do not have a Spotify account and/or want to disable Spotify integration, set `"music-service":"spotify"` to `"music-service": "nil"`.


## Included Modules
- [Spotify](docs/SPOTIFY.md)
- [Volume Mixers](docs/modules/VOLUME_MIXERS.md)
- Desktop Performance Stats
- [Smart Light Control](docs/modules/LIGHT_CONTROL.md)
- [Weather](docs/modules/WEATHER.MD)

## How to add a module
1) Create a view file(.pug), and optionally a .js, .css and settings(.json) file in their respective folders
```
public
   |  css
       | yourmodule.css
   | scripts
       | yourmodule.js
   | views
       | modules
       | yourmodule.pug
       | yourmodule.json
```
2) In your pug view file, the only requirement is to label the top-most/parent div the id you specifiy in ```view-settings.json```
```pug
   #yourmodule
      (content)
```

3) Add the module to ```view-settings.json```. The webpage will automatically include the script and style sheet files, as well as collect all of the json objects in ```yourmodule.json``` and send them alongside the rest of the settings data to the pug file and when retrieving settings from sockets in the script files(such as in ```display.js```).
```
  "modules" = [..., "yourmodule"],
  "currentModules: [
    ...,
    {
      "name": "Your Module",
      "id": "yourmodule",
      "script": "yourmodule.js",
      "css": "yourmodule.css",
      "settings": "yourmodule.json"
    }
  ]
```
4) Add the module to the view ```middle-row.pug``` 
```pug
  each module in currentModules
    if(module.id == "volume-mixer")
      include ../modules/volume-mixer
    ...
    else if(module.id == "yourmodule")
      include ../modules/yourmodule
```

## Screenshots
#### Performance Stats Module
![Performance Stats](screenshots/performance-stats-screenshot.png)

#### Smart Bulb Control Module
![Smart Bulb Control](screenshots/light-screenshot.png)

## Libraries used
  #### Server side
  - Express
  - Socket.io
  - Spotify Web Api for receiving current tracks
  - os-utils for easy access to CPU & memory usage
  - querystring
  - body-parser
  - nircmd for access to more functions through the command line

  
  #### Client Side
  - jQuery
  - jQuery Transit for smooth transformations in jQuery for the performance dials
  - Handlebars for templating/modularity
  - Muuri for draggable components
  - Socket.io
