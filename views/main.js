var html = require('choo/html')
var screencast = require('../elements/screencast')

module.exports = view

function view (opts) {
  var header = opts.elements.header

  var content = [
    screencast()
  ]

  return function (state, prev, send) {
    if (state.preferences.welcome) {
      send('location:set', '/welcome')
      return html`<body class="bg-dark-gray"></body>`
    }

    var cards = content.map(function (content) {
      return html`
        <section class="fl w-100 w-50-m w-33-l">
          <div class="ma2 ma3-l bg-white">
            ${content()}
          </div>
        </section>
      `
    })

    return html`
      <body class="bg-dark-gray fixed w-100">
        ${header(state.location.pathname)}
        <main class="cf center mw9 w-100 pa2 dib overflow-y-auto relative vhs-bottom">
          ${cards}
        </main>
      </body>
    `
  }
}
