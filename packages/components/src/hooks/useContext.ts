/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:12:42
 * @LastEditors: 李文光 1450551498@qq.com
 * @LastEditTime: 2022-12-15 14:14:04
 */
import { readonly as defineReadonly, inject, provide, reactive } from 'vue'
import type { InjectionKey, UnwrapRef } from 'vue'

export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideData)

  return {
    state
  }
}
// 没有默认值
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T
// 带有默认值
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T
// 使用工厂函数
export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
