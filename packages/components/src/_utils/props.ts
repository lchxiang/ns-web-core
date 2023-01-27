import type { PropType } from 'vue'
import type { VueTypeDef, VueTypeValidableDef } from 'vue-types'
//@ts-ignore
export const initDefaultProps = <T>(
  types: T,
  defaultProps: {
    [K in keyof T]?: T[K] extends VueTypeValidableDef<infer U>
      ? U
      : T[K] extends VueTypeDef<infer U>
      ? U
      : T[K] extends { type: PropType<infer U> }
      ? U
      : any
  }
): T => {
  const propTypes: T = { ...types }
  Object.keys(defaultProps).forEach((k) => {
    //@ts-ignore
    const prop = propTypes[k] as unknown as VueTypeValidableDef
    if (prop) {
      if (prop.type || prop.default) {
        //@ts-ignore

        prop.default = defaultProps[k]
      } else if (prop.def) {
        //@ts-ignore

        prop.def(defaultProps[k])
      } else {
        //@ts-ignore

        propTypes[k] = { type: prop, default: defaultProps[k] }
      }
    } else {
      throw new Error(`not have ${k} prop`)
    }
  })
  return propTypes
}
