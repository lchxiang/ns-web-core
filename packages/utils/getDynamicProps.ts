import { unref } from 'vue'

// dynamic use hook props
export default function getDynamicProps<T extends Object, U>(
  props: T
): Partial<U> {
  const ret: Record<string,any> = {}

  Object.keys(props).forEach((key) => {
    ret[key] = unref((props as Record<string,any>)[key])
  })

  return ret as Partial<U>
}
