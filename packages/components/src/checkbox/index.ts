import Checkbox from './Checkbox'
import type { App, Plugin } from 'vue'
export type { NsCheckboxProps, NsCheckboxInstance } from './Checkbox'

/* istanbul ignore next */
Checkbox.install = function (app: App) {
  app.component(Checkbox.name, Checkbox)
  return app
}

export default Checkbox as typeof Checkbox & Plugin
