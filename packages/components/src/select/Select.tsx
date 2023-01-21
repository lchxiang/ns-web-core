/*
 * @Author: yaoty yaoty@normstar.com
 * @Date: 2022-12-19 17:30:58
 * @LastEditors: yaoty yaoty@normstar.com
 * @LastEditTime: 2022-12-30 15:47:39
 * @FilePath: \ns-web-core\packages\ui\src\select\Select.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineComponent, unref } from 'vue'
import { Select } from 'ant-design-vue'
import { useDict } from '../hooks/useDict'
import { type DictProps, dictProps } from '../dict-props'
import { useNsProviderContext } from '../hooks/useNsContext'
import type { SelectProps } from 'ant-design-vue'
export type NsCheckboxProps = DictProps & SelectProps
export type NsSelectInstance = InstanceType<typeof NsSelect>

const NsSelect = defineComponent({
  name: 'NsSelect',
  props: dictProps,
  setup(props, { attrs }) {
    const { labelKey, valueKey } = useNsProviderContext()
    const fieldNames = computed(() => {
      return {
        label: labelKey,
        value: valueKey,
        ...(attrs.fieldNames || {})
      }
    })
    const { formatterDicData } = useDict(props, fieldNames)
    return () => (
      <Select {...attrs} options={formatterDicData.value} field-names={unref(fieldNames)}></Select>
    )
  }
})

export default NsSelect
