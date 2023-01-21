export type Compress = {
  url: string
  proportion?: number //压缩比例
  size?: number // 文件大小
  type?: string
  name?: string // 文件名称
}
export function dataURLtoFile({ url, name = '', type }: Compress) {
  const arr = url.split(',')
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], name, {
    type
  })
}
export function compress({ url, proportion = 0.5, type, name }: Compress): Promise<File> {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = url
  return new Promise((resolve) => {
    img.addEventListener('load', () => {
      let width = img.width
      let height = img.height
      const tCanvas = document.createElement('canvas')
      const tctx = tCanvas.getContext('2d')
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio: number
      // 判断图片像素是否是四百万
      if ((ratio = (width * height) / 4000000) > 1) {
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      // 铺底色
      if (!ctx) return
      ctx.fillStyle = '#fff'
      ctx?.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count: number
      if ((count = (width * height) / 1000000) > 1) {
        count = Math.trunc(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //  计算每块瓦片的宽和高
        const nw = Math.trunc(width / count)
        const nh = Math.trunc(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx?.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            )
            ctx?.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx?.drawImage(img, 0, 0, width, height)
      }
      // 判断图片大小是否超过1M 超过1M按最小比压缩
      const ndata = canvas.toDataURL(type, proportion)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      const files = dataURLtoFile({ url: ndata, name, type })
      resolve(files)
    })
  })
}
