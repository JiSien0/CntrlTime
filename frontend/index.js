const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.webContents.openDevTools()

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    const { exec } = require('child_process');
    exec('taskkill /f /t /im main.exe', (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('stdout: ${stdout}');
    console.log('stderr: ${stderr}');
    });

  if (process.platform !== 'darwin') app.quit()
})

let backend;
backend = path.join(process.cwd(), '../dist/main.exe')
var execfile = require('child_process').execFile;
execfile(
 backend,
 {
  windowsHide: true,
 },
 (err, stdout, stderr) => {
  if (err) {
  console.log(err);
  }
  if (stdout) {
  console.log(stdout);
  }
  if (stderr) {
  console.log(stderr);
  }
 }
)