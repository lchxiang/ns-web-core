import { defineComponent } from 'vue'
import { createNsProviderContext } from './hooks/useNsContext'
import { initDefaultProps } from './_utils/props'
import { globalConfig } from './global-config'
import type { PropType } from 'vue'
import type { NsAxios } from '@ns/http'
// import type { VxeGridProps } from 'vxe-table'
// import type { OperationConfig } from './table/src/types'
export const nsProviderProps = {
  dateFormat: String as PropType<string>,
  dateValueFormat: String as PropType<string>,
  timeFormat: String as PropType<string>,
  timeValueFormat: String as PropType<string>,
  valueKey: String as PropType<string>,
  labelKey: String as PropType<string>,
  operationConfig: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  gridConfig: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  http: {
    type: Object as PropType<NsAxios>,
    required: true
  }
}
export default defineComponent({
  name: 'NsProvider',
  inheritAttrs: false,
  props: initDefaultProps(nsProviderProps, globalConfig),
  setup(props, { slots }) {
    createNsProviderContext(props)
    return () => slots.default?.()
  }
})
