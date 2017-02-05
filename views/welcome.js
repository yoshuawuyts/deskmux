var html = require('choo/html')

module.exports = view

function view (opts) {
  var header = opts.elements.header

  return function (state, prev, send) {
    return html`
      <body class="bg-dark-gray">
        ${header(state.location.pathname)}
      </body>
    `
  }
}
