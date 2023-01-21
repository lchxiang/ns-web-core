import { isString, setObjToUrlParams } from '@ns/utils'
import { ContentTypeEnum, RequestEnum } from './enums'
import { formatRequestDate, joinTimestamp } from './helper'
import type { AxiosTransform, GetTransformParams } from './axiosTransform'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '../type'

export default function getTransform({
  failedHook,
  errorHook,
  requestInterceptors,
  responseInterceptors
}: Partial<GetTransformParams>) {
  const transformDefault: AxiosTransform = {
    /**
     * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
     */
    transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
      const { isTransformResponse, isReturnNativeResponse } = options
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      if (isReturnNativeResponse) {
        return res
      }
      // 不进行任何处理，直接返回
      // 用于页面代码可能需要直接获取code，data，message这些信息时开启
      if (!isTransformResponse) {
        return res.data
      }
      // 错误的时候返回

      const { data: outData } = res || {}
      if (!outData) {
        throw new Error('请求出错，请稍后重试')
      }
      //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
      const { data, succeed } = outData

      if (succeed) {
        return data
      } else {
        failedHook?.(outData, options)
      }
    },

    // 请求之前处理config
    beforeRequestHook: (config: AxiosRequestConfig, options) => {
      const { apiUrl, joinParamsToUrl, formatDate, joinTime = true, formData = false } = options
      if (apiUrl && isString(apiUrl) && !config.url?.startsWith('http://')) {
        config.url = `${apiUrl}${config.url}`
      }

      const params = config.params || {}
      const data = config.data || false
      formatDate && data && !isString(data) && formatRequestDate(data)
      if (config.method?.toUpperCase() === RequestEnum.GET) {
        if (!isString(params)) {
          // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
          config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
        } else {
          // 兼容restful风格
          config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
          config.params = undefined
        }
      } else if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
      if (formData) {
        //@ts-ignore
        config.headers = {
          ...(config.headers || {}),
          'Content-Type': ContentTypeEnum.FORM_URLENCODED
        }
      }
      return config
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config) => {
      return config
    },

    /**
     * @description: 响应拦截器处理
     */
    responseInterceptors: (res: AxiosResponse<any>) => {
      return res
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: (_axiosInstance: AxiosResponse, error: any) => {
      const { code, message, config } = error || {}
      const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
      // const msg: string = response?.data?.error?.message ?? ''
      const err: string = error?.toString?.() ?? ''
      let errorMessage = ''

      try {
        if (code === 'ECONNABORTED' && message.includes('timeout')) {
          errorMessage = '请求超时，请刷新页面'
        }
        if (err?.includes('Network Error')) {
          errorMessage = '网络异常，请检查您的网络链接是否正常'
        }

        if (errorMessage) {
          errorHook && errorHook({ errorMessageMode, errorMessage })
          return Promise.reject(error)
        }
      } catch (error) {
        throw new Error(error as unknown as string)
      }

      // checkStatus(error?.response?.status, msg, errorMessageMode)

      return Promise.reject(error)
    }
  }

  return Object.assign(transformDefault, {
    requestInterceptors,
    responseInterceptors
  })
}
