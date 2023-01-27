// import throttle from 'lodash-es/throttle'
import uniqueId from 'lodash-es/uniqueId'
import { getCurrentInstance, onBeforeUnmount, shallowRef, unref } from 'vue'
type attr = {
  font?: string
  fillStyle?: string
}
export function useWatermark(appendEl: Element | null | undefined = document.body as HTMLElement) {
  // 绘制文字背景图
  function createBase64(str: string, attr?: attr): string {
    const can = document.createElement('canvas')
    const width = 200
    const height = 140
    Object.assign(can, { width, height })
    const cans = can.getContext('2d')
    if (cans) {
      cans.rotate((-20 * Math.PI) / 120)
      cans.font = attr?.font ?? '12px Reggae One'
      cans.fillStyle = attr?.fillStyle ?? 'rgba(0, 0, 0, 0.12)'
      cans.textAlign = 'left'
      cans.textBaseline = 'middle'
      cans.fillText(str, width / 20, height)
    }
    return can.toDataURL('image/png')
  }
  const id = Symbol(uniqueId('NS')).toString()
  const watermarkEl = shallowRef<HTMLElement>()
  // 绘制水印层
  const createWatermark = (str: string, attr?: attr) => {
    if (unref(watermarkEl)) {
      updateWatermark({ str, attr })
      return id
    }
    const div = document.createElement('div')
    watermarkEl.value = div
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = '100000'
    const el = unref(appendEl)
    if (!el) return id
    updateWatermark({ str, attr })
    el.append(div)
    return id
  }

  // 页面随窗口调整更新水印
  function updateWatermark(
    options: {
      str?: string
      attr?: attr
    } = {}
  ) {
    const el = unref(watermarkEl)
    if (!el) return
    el.style.width = `100%`
    el.style.height = `100%`
    if (options.str) {
      el.style.background = `url(${createBase64(options.str, options.attr)}) left top repeat`
    }
  }

  // 对外提供的设置水印方法
  function setWatermark(str: string, attr?: attr) {
    createWatermark(str, attr)
    antiDeletion(str, attr)
    // addResizeListener(document.documentElement, func)
    const instance = getCurrentInstance()
    if (instance) {
      onBeforeUnmount(() => {
        clear()
      })
    }
  }
  //   const func = throttle(() => {
  //     const el = unref(appendEl)
  //     if (!el) return
  //     const { clientHeight: height, clientWidth: width } = el
  //     updateWatermark({ height, width })
  //   })

  // 清除水印
  const clear = () => {
    const domId = unref(watermarkEl)
    watermarkEl.value = undefined
    const el = unref(appendEl)
    if (!el) return
    domId && el?.removeChild(domId)
    // removeResizeListener(el, func)
  }
  const observers: MutationObserver[] = []
  //   监听元素的删除和隐藏
  const antiDeletion = (str: string, attr?: attr) => {
    const targetNode = unref(watermarkEl)
    const parentNode = appendEl
    const config = {
      childList: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true
    }
    observers[0] = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        const type = mutation.type
        switch (type) {
          case 'childList':
            if (mutation.removedNodes.length > 0) {
              parentNode?.append(mutation.removedNodes[0])
            }
            break
          default:
            break
        }
      }
    })
    parentNode && observers[0].observe(parentNode, { childList: true })
    observers[1] = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        const type = mutation.type
        switch (type) {
          case 'attributes':
            if (mutation.attributeName === 'style' && targetNode) {
              targetNode.style.display = 'block'
              targetNode.style.zIndex = '100000'
              targetNode.style.top = '0px'
              targetNode.style.left = '0px'
              targetNode.style.width = '100%'
              targetNode.style.height = '100%'
              targetNode.style.position = 'absolute'
              targetNode.style.background = `url(${createBase64(str, attr)}) left top repeat`
            }
            if (mutation.attributeName === 'class' && targetNode) {
              targetNode.style.setProperty('visibility', 'visible', 'important')
            }

            break
          default:
            break
        }
      }
    })
    targetNode && observers[1].observe(targetNode, config)
  }
  return { setWatermark, clear, updateWatermark }
}
