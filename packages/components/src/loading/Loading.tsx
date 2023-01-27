import { defineComponent } from 'vue'
import { loadingProps } from './types'
export default defineComponent({
  name: 'NsLoading',
  props: loadingProps,
  setup(props) {
    return () => {
      const { theme, absolute, background, tip, size, loading } = props
      return (
        <section
          v-show="loading"
          class={{ 'full-loading': true, absolute, [theme]: !!theme }}
          style={[background ? `background-color: ${background}` : '']}
        >
          <a-spin v-bind="$attrs" tip={tip} size={size} spinning={loading} />
        </section>
      )
    }
  }
})
