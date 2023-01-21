import { deepMerge } from '@ns/utils'
import { ContentTypeEnum } from './enums'
import { NsAxios } from './Axios'
import getTransform from './getTransform'
import type { CreateAxiosOptions } from './axiosTransform'
export function createAxios({
  failedHook,
  errorHook,
  requestInterceptors,
  responseInterceptors,
  ...restOptions
}: Partial<Omit<CreateAxiosOptions, 'transform'>>) {
  const realTransform = getTransform({
    failedHook,
    errorHook,
    requestInterceptors,
    responseInterceptors
  })

  const defaultConfig = {
    authenticationScheme: '',
    timeout: -1,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      formData: false,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'message',
      // 接口地址 `/api${shortName || ''}`
      apiUrl: '',
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true,
      useMessage: undefined
    }
  }
  const realConfig: CreateAxiosOptions = deepMerge(defaultConfig, restOptions || {})
  return new NsAxios({
    ...realConfig,
    transform: realTransform
  })
}
