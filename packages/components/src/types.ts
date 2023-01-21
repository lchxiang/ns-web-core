import type { VNode } from 'vue'
export type Nullable<T> = T | null
export type Key = string | number
export type Recordable<T = any> = Record<string, T>

export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element
