import { computed, defineComponent, unref } from 'vue'
import { Checkbox, CheckboxGroup, type CheckboxProps } from 'ant-design-vue'
import { useDict } from '../hooks/useDict'
import { useNsProviderContext } from '../hooks/useNsContext'
import { dictProps } from '../dict-props'
import type { PropType } from 'vue'
import type { DictProps, NsFieldNames } from '../dict-props'
import type { Recordable } from '../types'

export type NsCheckboxProps = DictProps & CheckboxProps
export type NsCheckboxInstance = InstanceType<typeof NsCheckbox>

const nsCheckboxProps = {
  ...dictProps,
  fieldNames: {
    type: Object as PropType<NsFieldNames>,
    default: () => ({})
  }
}

const NsCheckbox = defineComponent({
  name: 'NsCheckbox',
  inheritAttrs: false,
  props: nsCheckboxProps,
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

    return () => (
      <CheckboxGroup {...attrs}>
        {formatterDicData.value.map((item: Recordable, index) => {
          return (
            <Checkbox value={item[unref(fieldNames).value]} key={index}>
              {item[unref(fieldNames).label]}
            </Checkbox>
          )
        })}
      </CheckboxGroup>
    )
  }
})

export default NsCheckbox
