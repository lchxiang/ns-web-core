/*
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: 李文光 1450551498@qq.com
 * @LastEditTime: 2022-12-15 14:13:59
 */
import { unref } from 'vue'
import { createLoading } from '@ns/ui/src/loading/createLoading'
import type { Ref } from 'vue'
import type { LoadingProps } from '@ns/ui/src/loading/index'

export interface UseLoadingOptions {
  target?: any
  props?: Partial<LoadingProps>
}

export function useLoading(props: Partial<LoadingProps>): [Fn, Fn, (arg0: string) => void]
export function useLoading(opt: Partial<UseLoadingOptions>): [Fn, Fn, (arg0: string) => void]

export function useLoading(
  opt: Partial<LoadingProps> | Partial<UseLoadingOptions>
): [Fn, Fn, (arg0: string) => void] {
  let props: Partial<LoadingProps>
  let target: HTMLElement | Ref<ElRef> = document.body

  if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
    const options = opt as Partial<UseLoadingOptions>
    props = options.props || {}
    target = options.target || document.body
  } else {
    props = opt as Partial<LoadingProps>
  }

  const instance = createLoading(props, undefined, true)

  const open = (): void => {
    const t = unref(target as Ref<ElRef>)
    if (!t) return
    instance.open(t)
  }

  const close = (): void => {
    instance.close()
  }

  const setTip = (tip: string) => {
    instance.setTip(tip)
  }

  return [open, close, setTip]
}
