var component = require('nanocomponent')
var morph = require('nanomorph')
var html = require('choo/html')
var css = require('sheetify')

var prefix = css`
  :host {
    -webkit-app-region: drag;
    background-color: inherit;
  }
`

module.exports = element

function element (opts) {
  return component({
    render: render,
    onupdate: onupdate
  })

  function render (pathname) {
    var title = (pathname === '')
      ? 'deskmux | home'                             // replace '/' with words
      : (pathname === '#welcome')
        ? ''                                         // no title on welcome
        : 'deskmux | ' + pathname.replace(/^\//, '') // remove leading slash

    return html`
      <header class="${prefix} h2 w-100 flex justify-center dib">
        <h2 class="gray f6 code">
          ${title}
        </h2>
      </header>
    `
  }

  function onupdate (el, pathname) {
    morph(render(pathname), el)
  }
}
