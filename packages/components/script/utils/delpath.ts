import fs from 'node:fs'
import { resolve } from 'node:path'
import { componentPath } from './paths'
const stayFile = ['package.json', 'README.md']

const delPath = async (path: string) => {
  let files: string[] = []

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path)

    files.forEach(async (file) => {
      const curPath = resolve(path, file)
      console.log(curPath, 777)
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        if (file !== 'node_modules') await delPath(curPath)
      } else {
        // delete file
        // if (!stayFile.includes(file)) {
        fs.unlinkSync(curPath)
        // }
      }
    })

    if (path !== `${componentPath}/ns-ui`) fs.rmdirSync(path)
  }
}
export default delPath
