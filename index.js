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

const browserifyOpts = {
  insertGlobals: true,
  ignoreMissing: true,
  builtins: false,
  browserField: false,
  insertGlobalVars: {
    '__dirname': function (file, basedir) {
      var relativePath = path.relative(basedir, file)
      var dirPath = path.dirname(relativePath)
      var dirname = '"' + dirPath + '"'
      return "require('path').join(__dirname, " + dirname + ')'
    },
    '__filename': function (file, basedir) {
      var filename = '"' + path.relative(basedir, file) + '"'
      return "require('path').join(__dirname, " + filename + ')'
    },
    'process': undefined,
    'global': undefined,
    'Buffer': undefined,
    'Buffer.isBuffer': undefined
  },
  postFilter: function (id, file, pkg) {
    if (!file) return false
    file = path.relative(__dirname, file)
    if (file.indexOf('node_modules') !== -1 &&
      file.indexOf('sheetify') === -1) {
      return false
    }
    return true
  }
}

var windowStyles = {
  titleBarStyle: 'hidden-inset',
  minWidth: 640,
  height: 600,
  width: 800
}

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
  var indexPath = url.format({
    protocol: 'file',
    pathname: path.resolve(__dirname, 'index.html'),
    slashes: true
  })
  var assets = bankai(clientPath, { js: browserifyOpts, html: false })
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
  var indexPath = path.join(__dirname, 'dist/index.html')
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
