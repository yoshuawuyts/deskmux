console.log(__dirname, __filename)
var persist = require('choo-persist')
var mount = require('choo/mount')
var log = require('choo-log')
var css = require('sheetify')
var choo = require('choo')

var Header = require('./elements/header')

css`
  html {
    -webkit-user-select: none;
    -webkit-user-drag: none;
    cursor: default;
  }
  img { -webkit-user-drag: none }
  main {
    overflow-y: auto;
    height: calc(100vh - 2rem); /* height of header */
  }
`

css('vhs/css/vhs.css')
css('tachyons')

var opts = {
  elements: {
    header: Header()
  }
}

persist(function (persist) {
  var app = choo()
  app.use(persist)
  app.use(log())

  app.model(require('./models/preferences')())

  app.router([
    [ '/', require('./views/main')(opts) ],
    [ '#welcome', require('./views/welcome')(opts) ]
  ])

  mount('body', app.start())
})
