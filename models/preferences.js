var assert = require('assert')

module.exports = model

function model () {
  return {
    namespace: 'preferences',
    state: {
      welcome: true
    },
    effects: {
      dismissWelcome: dismissWelcome
    },
    reducers: {
      toggleWelcome: toggleWelcome
    }
  }

  function dismissWelcome (state, action, send, done) {
    send('preferences:toggleWelcome', { toggle: false }, done)
  }

  function toggleWelcome (state, action) {
    assert.equal(typeof action.toggle, 'boolean')
    return { welcome: action.toggle }
  }
}
