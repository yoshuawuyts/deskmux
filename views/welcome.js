var html = require('choo/html')

module.exports = view

function view (opts) {
  var header = opts.elements.header

  return function (state, prev, send) {
    return html`
      <body class="bg-dark-gray code">
        ${header(state.location.hash)}
        <main class="flex flex-column justify-center vh-75 pa5">
          <h1 class="pt5 mt0 ttu f-headline white sans-serif vhs-flicker">
            Welcome to deskmux
          </h1>
          <a href="/" onclick=${onclick}
            class="bn f3 link white self-end ttu underline o-0 vhs-flicker vhs-delay-4">
            Continue
          </a>
        </main>
      </body>
    `

    function onclick () {
      send('preferences:dismissWelcome')
    }
  }
}
