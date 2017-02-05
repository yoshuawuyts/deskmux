var html = require('choo/html')
var Header = require('../elements/header')

var header = Header()

module.exports = view

function view (state, prev, send) {
  return html`
    <body class="bg-dark-gray">
      ${header()}
    </body>
  `
}
