/*
 * @Author: liwg
 * @Date: 2022-03-19 10:47:20
 * @LastEditors: liwg
 * @LastEditTime: 2022-03-19 10:55:58
 */
export enum SizeEnum {
  DEFAULT = 'default',
  SMALL = 'small',
  LARGE = 'large'
}

export enum SizeNumberEnum {
  DEFAULT = 48,
  SMALL = 16,
  LARGE = 64
}

export const sizeMap: Map<SizeEnum, SizeNumberEnum> = (() => {
  const map = new Map<SizeEnum, SizeNumberEnum>()
  map.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT)
  map.set(SizeEnum.SMALL, SizeNumberEnum.SMALL)
  map.set(SizeEnum.LARGE, SizeNumberEnum.LARGE)
  return map
})()
