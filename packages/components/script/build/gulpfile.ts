import { parallel, series } from 'gulp'
import { buildComponent, buildStyle, copyStyle, removeDist } from './index'

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => copyStyle(),
    async () => buildComponent()
  )
)
