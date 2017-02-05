var mount = require('choo/mount')
var log = require('choo-log')
var css = require('sheetify')
var choo = require('choo')

var Header = require('./elements/header')

css('vhs/css/vhs.css')
css('tachyons')

var app = choo()
app.use(log())

app.model(require('./models/preferences')())

var opts = {
  elements: {
    header: Header()
  }
}

app.router([
  [ '/', require('./views/main')(opts) ],
  [ '/welcome', require('./views/welcome')(opts) ]
])

mount('body', app.start())
