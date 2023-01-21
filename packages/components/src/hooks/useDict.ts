import { computed, ref, unref, watchEffect } from 'vue'
import { isBoolean, isNumber, isPlainObject, isString } from 'lodash-es'
import { getValueByPath } from '../_utils/index'
import { useNsProviderContext } from './useNsContext'
import type { Recordable } from '../types'
import type { ComputedRef } from 'vue'
import type { DictProps } from '../dict-props'
export function useDict(
  props: DictProps,
  fieldNames: ComputedRef<Recordable>,
  optionsField: keyof DictProps = 'options'
) {
  const { http } = useNsProviderContext()
  const innerDicData = ref<unknown[]>([])
  const { url, proxy, ajaxData, resultPath } = props

  //格式化字典数据 支持[1,2,3,4]这种字典数据
  const formatterDicData = computed<Recordable[]>(() => {
    const { url } = props
    const labelKey = unref(fieldNames).label
    const valueKey = unref(fieldNames).value
    const options = (props[optionsField] as unknown[]) || []
    const realDicData = url || proxy ? unref(innerDicData) : options
    const first = realDicData[0]
    if (realDicData.length > 0 && isPlainObject(first)) {
      return (realDicData as Recordable[]) || []
    } else if (realDicData.length > 0 && (isString(first) || isNumber(first) || isBoolean(first))) {
      return realDicData.map((item: unknown) => {
        return {
          [labelKey]: item,
          [valueKey]: item
        } as Recordable
      })
    }
    return (realDicData as Recordable[]) || []
  })

  //内部请求字典数据
  watchEffect(async () => {
    if (!url || !proxy) innerDicData.value = []
    let list = []
    if (proxy) {
      list = await proxy(props)
    } else if (url) {
      const res = await http?.post({
        url,
        data: ajaxData
      })
      list = getValueByPath(res, unref(resultPath))
    }
    innerDicData.value = list || []
  })

  return {
    formatterDicData
  }
}
