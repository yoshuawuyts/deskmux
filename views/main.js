var html = require('choo/html')

module.exports = view

function view (opts) {
  var header = opts.elements.header

  var content = [
    'hello planet',
    'hello planet',
    'hello planet',
    'hello planet',
    'hello planet'
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
            ${content}
          </div>
        </section>
      `
    })

    return html`
      <body class="bg-dark-gray">
        ${header(state.location.pathname)}
        <main class="cf center mw9 pa2">
          ${cards}
        </main>
      </body>
    `
  }
}
