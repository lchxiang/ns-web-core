/*
 * @Author: liwg
 * @Date: 2022-03-19 10:43:55
 * @LastEditors: qgl 13949075679@163.com
 * @LastEditTime: 2023-01-13 16:15:57
 */

import { createVNode, defineComponent, h, reactive, render } from 'vue'
import NsLoading from './Loading'
import type { VNode } from 'vue'

import type { LoadingProps } from './types'
import type { Nullable } from '../types'

export function createLoading(props: Partial<LoadingProps>, target?: HTMLElement, wait = false) {
  let vm: Nullable<VNode> = null
  const data = reactive({
    tips: '',
    loading: true,
    ...props
  })
  const loadingWrap = defineComponent({
    render() {
      return h(NsLoading, { ...data })
    }
  })
  vm = createVNode(loadingWrap)
  // vnod=>HTMLElement
  if (wait) {
    setTimeout(() => {
      render(vm, document.createElement('div'))
    }, 0)
  } else {
    render(vm, document.createElement('div'))
  }

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.remove()
    }
  }

  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return
    }
    target.append(vm.el as HTMLElement)
  }

  if (target) {
    open(target)
  }

  return {
    vm,
    close,
    open,
    setTip: (tip: string) => {
      data.tip = tip
    },
    setLoading: (loading: boolean) => {
      data.loading = loading
    },
    get loading() {
      return data.loading
    },
    get $el() {
      return vm?.el as HTMLElement
    }
  }
}
