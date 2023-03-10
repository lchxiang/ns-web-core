import { dest, src } from 'gulp'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import { componentPath } from '../utils/paths'
import delpath from '../utils/delpath'
import run from '../utils/run'
//删除dist
export const removeDist = () => {
  return delpath(`${componentPath}/ns-ui`)
}

//处理样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${componentPath}/ns-ui/lib/src`))
    .pipe(dest(`${componentPath}/ns-ui/es/src`))
}

//处理样式
export const copyStyle = () => {
  return src(`${componentPath}/src/**/**.less`)
    .pipe(dest(`${componentPath}/ns-ui/lib/src`))
    .pipe(dest(`${componentPath}/ns-ui/es/src`))
}

//打包组件
export const buildComponent = async () => {
  run('pnpm run build', componentPath)
}
