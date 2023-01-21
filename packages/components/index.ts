import * as components from './src/components'
import { App } from 'vue'
export default {
  install(app:App) {
    Object.keys(components).forEach(key => {
      /* @ts-ignore */
      const component = components[key] 
      if (component.install) {
        app.use(component);
      }
    })
    return app
  }
}
