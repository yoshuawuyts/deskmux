var desktopCapturer = require('electron').desktopCapturer
var hyperdiscovery = require('hyperdiscovery')
var recorder = require('media-recorder-stream')
var cluster = require('webm-cluster-stream')
var component = require('nanocomponent')
var raf = require('random-access-file')
var eos = require('end-of-stream')
var html = require('choo/html')
var fs = require('fs')

module.exports = element

function element () {
  return component({
    placeholder,
    render: render
  })

  function placeholder () {
    return html`
      <div class="bg-washed-blue green"></div>
    `
  }

  function render () {
    return html`
      <div class="bg-washed-blue green pa3">
        <div class="cf">
          <h1 class="fl ttu f4 code b mt0 w-50">
            Screencast
          </h1>
          <button class="fl w-50 bn pa0 bg-washed-blue green underline pointer">
            New Recording
          </button>
        </div>
        <div class="h4 w-100 bg-washed-green"></div>
      </div>
    `
  }
}
