import NsLoading from './Loading'
import type { App, Plugin } from 'vue'
export type { LoadingProps } from './types'
/* istanbul ignore next */
NsLoading.install = function (app: App) {
  app.component(NsLoading.name, NsLoading)
  return app
}

export default NsLoading as typeof NsLoading & Plugin
