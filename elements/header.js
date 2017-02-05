var nanocomponent = require('nanocomponent')
var morph = require('nanomorph')
var html = require('choo/html')
var css = require('sheetify')

var prefix = css`
  :host {
    -webkit-app-region: drag
  }
`

module.exports = element

function element (opts) {
  return nanocomponent({
    render: render,
    onupdate: onupdate
  })

  function render (pathname) {
    var title = (pathname === '/')
      ? 'deskmux | home'                             // replace '/' with words
      : (pathname === '/welcome')
        ? ''                                         // no title on welcome
        : 'deskmux | ' + pathname.replace(/^\//, '') // remove leading slash

    return html`
      <header class="${prefix} w-100 bg-dark-gray flex justify-center">
        <h2 class="gray f5">
          ${title}
        </h2>
      </header>
    `
  }

  function onupdate (el, pathname) {
    morph(render(pathname), el)
  }
}
