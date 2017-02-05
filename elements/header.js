var nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var prefix = css`
  :host {
    -webkit-app-region: drag
  }
`

module.exports = element

function element (opts) {
  var el = html`
    <header class="${prefix} w-100 pa2 pb3 bg-dark-gray">
      <br />
    </header>
  `

  return nanocomponent(el)
}
