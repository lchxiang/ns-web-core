/*
 * @description:
 * @Author: liwg
 * @Date: 2022-04-09 15:06:53
 * @LastEditors: liwg
 * @LastEditTime: 2022-06-29 16:48:07
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export type RequestOptions = {
  //请求参数以formaData格式传递
  formData?: boolean
  // 非get请求 参数是否拼接到url中
  joinParamsToUrl?: boolean
  // 格式化日期
  formatDate?: boolean
  // 是否处理请求结果 不处理会直接返回 跳过登录过期 报错等
  isTransformResponse?: boolean
  // 是否返回原生相应头 包括 code data message 默认直接返回data数据
  isReturnNativeResponse?: boolean
  // 请求拼接路径
  urlPrefix?: string
  // 是否拼接
  joinPrefix?: boolean
  // 取代原生baseUrl
  apiUrl?: string
  loading?: boolean
  // 错误消息类型
  errorMessageMode?: ErrorMessageMode
  // 是否加时间戳
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // 请求头是否加入token
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}

export type RetryRequest = {
  isOpenRetry: boolean
  count: number
  waitTime: number
}
export type Result<T = any> = {
  code: number | string
  succeed: string
  message?: string
  data: T
}

// multipart/form-data: upload file
export type UploadFileParams = {
  // Other parameters
  data?: Record<string, any>
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
