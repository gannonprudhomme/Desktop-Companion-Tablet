# Desktop-Control-Tablet
A Desktop Companion Tablet built to control my Windows 10 home computer with a Raspberry Pi and touch screen

![Screenshot](screenshots/screenshot1.png)

## Features
- Live Spotify current track display and playback control
- Built in remote volume mixer control for any desktop program
- Change current audio output device
- Live desktop performance(CPU, memory) display
- Modular, which allows any practically any control-feature to be implemented and inserted
- Wireless Smart Bulb control and synchronization with f.lux

## Set up and usage
1) Install npm and nircmd on your PC
2) After cd'ing into the repo, run npm install to install all of the relevant packages
3) Set the IP of your main computer in the files
4) Connect to http://IP/ on the Pi
5)

## How it works

## Screenshots

## Performance/Delay

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
  
  
