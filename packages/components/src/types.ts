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

export type LabelValueOptions = {
  label: string
  value: any
  [key: string]: string | number | boolean
}[]

export type EmitType = (event: string, ...args: any[]) => void

export type TargetContext = '_self' | '_blank'

export interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

export type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element
