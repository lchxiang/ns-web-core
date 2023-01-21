/*
 * @description:
 * @Author: liwg
 * @Date: 2022-04-09 14:38:25
 * @LastEditors: 李文光 1450551498@qq.com
 * @LastEditTime: 2022-11-07 21:15:02
 */
/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ErrorMessageMode, RequestOptions, Result } from '../type'
export interface ErrorHookParams {
  errorMessageMode: ErrorMessageMode
  errorMessage: string
}

export interface GetTransformParams {
  requestInterceptors?: AxiosTransform['requestInterceptors']
  responseInterceptors?: AxiosTransform['responseInterceptors']
  //请求失败（请求通过 但是succeed：false ）
  failedHook?: (reslut: Result, requestOptions: RequestOptions) => void
  //请求异常报错
  errorHook?: (opt: ErrorHookParams) => void
}

export interface CreateAxiosOptions extends AxiosRequestConfig, GetTransformParams {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
   */
  transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void
}
