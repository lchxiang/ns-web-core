/*
 * @description:
 * @Author: liwg
 * @Date: 2022-09-19 16:28:15
 * @LastEditors: 李文光 1450551498@qq.com
 * @LastEditTime: 2022-11-07 14:27:08
 */
import { createContext, useContext } from './useContext'
import type { InjectionKey } from 'vue'
import type { GlobalConfig } from './../global-config'

const key: InjectionKey<GlobalConfig> = Symbol()

export function createNsProviderContext(context: GlobalConfig) {
  return createContext<GlobalConfig>(context, key)
}

export function useNsProviderContext() {
  return useContext<GlobalConfig>(key)
}
