import Radio from './Radio'
import type { App, Plugin } from 'vue'
export type { NsRadioProps, NsRadioInstance } from './Radio'

/* istanbul ignore next */
Radio.install = function (app: App) {
  app.component(Radio.name, Radio)
  return app
}

export default Radio as typeof Radio & Plugin
