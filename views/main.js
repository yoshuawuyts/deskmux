var html = require('choo/html')

module.exports = view

function view (opts) {
  var header = opts.elements.header

  return function (state, prev, send) {
    var h = header(state.location.pathname)
    console.trace(h)
    return html`
      <body class="bg-dark-gray">
        ${h}
      </body>
    `
  }
}
