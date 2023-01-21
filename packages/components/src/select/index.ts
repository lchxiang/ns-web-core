import Select from './Select'
import type { App, Plugin } from 'vue'

/* istanbul ignore next */
Select.install = function (app: App) {
  app.component(Select.name, Select)
  return app
}

export default Select as typeof Select & Plugin
