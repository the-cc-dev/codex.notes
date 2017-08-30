let electron = require('electron');

let app = electron.app;
let BrowserWindow = electron.BrowserWindow;

let backend = require('./bin/www');

let mainWindow;


/**
 * Inter Process Communication - Main proccess
 */
let ipcMain = electron.ipcMain;

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    backgroundColor: '#fff',
    titleBarStyle: 'hiddenInset'
  });

  mainWindow.loadURL('http://localhost:3030');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


});

// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
   console.log(arg);

   // Event emitter for sending asynchronous messages
   event.sender.send('asynchronous-reply', 'async pong');
});

// Event handler for synchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
   console.log(arg);

   // Synchronous event emmision
   event.returnValue = 'sync pong';
});
