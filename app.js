var mount = require('choo/mount')
var log = require('choo-log')
var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
app.use(log())

app.router(
  [ '/', require('./views/main') ]
)

mount('body', app.start())
