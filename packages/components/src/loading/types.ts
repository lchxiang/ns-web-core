import { SizeEnum } from '../enums/sizeEnum'
import type { ExtractPropTypes, PropType } from 'vue'

export const loadingProps = {
  tip: {
    type: String as PropType<string>,
    default: ''
  },
  size: {
    type: String as PropType<SizeEnum>,
    default: SizeEnum.DEFAULT
  },
  absolute: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  background: {
    type: String as PropType<string>
  },
  theme: {
    type: String as PropType<'dark' | 'light'>,
    default: ''
  }
}
export type LoadingProps = Partial<ExtractPropTypes<typeof loadingProps>>
