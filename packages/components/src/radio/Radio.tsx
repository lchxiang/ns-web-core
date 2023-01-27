import { computed, defineComponent, unref } from 'vue'
import { Radio, RadioButton, RadioGroup } from 'ant-design-vue'
import { useDict } from '../hooks/useDict'
import { dictProps } from '../dict-props'
import { useNsProviderContext } from '../hooks/useNsContext'
import type { ExtractPropTypes, PropType } from 'vue'

import type { NsFieldNames } from '../dict-props'
import type { RadioGroupProps } from 'ant-design-vue'
import type { Recordable } from '../types'

const radioProps = {
  ...dictProps,
  fieldNames: {
    type: Object as PropType<NsFieldNames>,
    default: () => ({})
  }
}
type Iprops = ExtractPropTypes<typeof dictProps>
export type NsRadioProps = Iprops & RadioGroupProps
export type NsRadioInstance = InstanceType<typeof NsRadio>
const NsRadio = defineComponent({
  name: 'NsRadio',
  inheritAttrs: false,
  props: radioProps,
  setup(props, { attrs }) {
    const { labelKey, valueKey } = useNsProviderContext()
    const fieldNames = computed(() => {
      return Object.assign(
        {
          label: labelKey,
          value: valueKey
        },
        props.fieldNames || {}
      )
    })
    const { formatterDicData } = useDict(props, fieldNames)
    return () => {
      const RealComponent = attrs.optionType === 'button' ? RadioButton : Radio
      return (
        <RadioGroup {...attrs}>
          {formatterDicData.value.map((item: Recordable, index) => {
            const itemLabel = item[unref(fieldNames).label]
            const itemValue = item[unref(fieldNames).value]
            return (
              <RealComponent value={itemValue} key={index}>
                {itemLabel}
              </RealComponent>
            )
          })}
        </RadioGroup>
      )
    }
  }
})
export default NsRadio
