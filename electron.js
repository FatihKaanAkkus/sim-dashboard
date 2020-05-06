const path = require('path')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

let nodeEnv = 'production'
let startAppUrl = 'localhost'
let startFrameless = false
let startFullscreen = false
let startDevTools = false
let startRotated = false

if (process.env.hasOwnProperty('NODE_ENV'))
  nodeEnv = process.env.NODE_ENV // prettier-ignore
if (process.env.hasOwnProperty('START_APPURL')) startAppUrl = process.env.START_APPURL
if (process.env.hasOwnProperty('START_FRAMELESS')) startFrameless = parseInt(process.env.START_FRAMELESS)
if (process.env.hasOwnProperty('START_FULLSCREEN')) startFullscreen = parseInt(process.env.START_FULLSCREEN)
if (process.env.hasOwnProperty('START_DEVTOOLS')) startDevTools = parseInt(process.env.START_DEVTOOLS)
if (process.env.hasOwnProperty('START_ROTATED')) startRotated = parseInt(process.env.START_ROTATED)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: startRotated ? 1024 : 600,
    height: startRotated ? 600 : 1024,
    webPreferences: { nodeIntegration: true },
    icon: path.join(__dirname + '/public/app.png'),
    frame: !startFrameless,
    fullscreen: startFullscreen
  })

  mainWindow.loadURL(nodeEnv === 'dev' ? `http://${startAppUrl}:3000/` : `http://${startAppUrl}/`) // prettier-ignore

  if (startDevTools) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => (mainWindow = null))

  // if (startFullscreen) {
  //   mainWindow.maximize()
  //   mainWindow.setFullScreen(true)
  // }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
