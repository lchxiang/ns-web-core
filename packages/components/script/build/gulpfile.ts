import { parallel, series } from 'gulp'
import { buildComponent, buildStyle, removeDist,copyStyle } from './index'

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle()
    ,
    async () => copyStyle(),
    async () => buildComponent()
  )
)
