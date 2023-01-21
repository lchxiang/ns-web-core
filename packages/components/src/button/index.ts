import NsButton from './Button'
import type { App, Plugin } from 'vue'
/* istanbul ignore next */
NsButton.install = function (app: App) {
  app.component(NsButton.name, NsButton)
  return app
}

export default NsButton as typeof NsButton & Plugin
