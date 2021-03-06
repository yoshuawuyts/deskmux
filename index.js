var defaultMenu = require('electron-default-menu')
var electron = require('electron')
var bankai = require('bankai')
var merry = require('merry')
var url = require('url')
var path = require('path')

var BrowserWindow = electron.BrowserWindow
var shell = electron.shell
var Menu = electron.Menu
var app = electron.app

var windowStyles = {
  titleBarStyle: 'hidden-inset',
  minWidth: 640,
  height: 600,
  width: 800
}

var indexPath = url.format({
  pathname: path.resolve(__dirname, 'index.html'),
  protocol: 'file',
  slashes: true
})

var env = merry.env({
  NODE_ENV: 'production',
  PORT: 8080
})

app.on('ready', function () {
  if (env.NODE_ENV === 'development') renderDevelopment()
  else renderProduction()
})

function renderDevelopment () {
  var clientPath = path.join(__dirname, 'app.js')
  var assets = bankai(clientPath, { electron: true, html: false })
  var server = merry()

  server.router([
    [ '/bundle.js', _merryAssets(assets.js.bind(assets)) ],
    [ '/bundle.css', _merryAssets(assets.css.bind(assets)) ]
  ])

  server.listen(env.PORT, function () {
    var win = new BrowserWindow(windowStyles)
    win.loadURL(indexPath)
    win.webContents.on('did-finish-load', function () {
      win.show()
      var menu = Menu.buildFromTemplate(defaultMenu(app, shell))
      Menu.setApplicationMenu(menu)
    })
  })
}

function renderProduction () {
  var win = new BrowserWindow(windowStyles)
  win.loadURL(indexPath)
  win.webContents.on('did-finish-load', function () {
    win.show()
    var menu = Menu.buildFromTemplate(defaultMenu(app, shell))
    Menu.setApplicationMenu(menu)
    win.webContents.openDevTools()
  })
}

function _merryAssets (assets) {
  return function (req, res, ctx, done) {
    done(null, assets(req, res))
  }
}
