import type { ExtractPropTypes, PropType } from 'vue'
import type { PromiseFn } from './types'
export interface NsFieldNames {
  label: string
  value: string
}
export const dictProps = {
  url: String as PropType<string>,
  options: Array as PropType<unknown[]>,
  ajaxData: Object as PropType<Record<string, unknown>>,
  proxy: {
    type: Function as PropType<PromiseFn>
  },
  resultPath: {
    type: String as PropType<string>,
    default: 'data.list'
  }
}

export type DictProps = ExtractPropTypes<typeof dictProps>
