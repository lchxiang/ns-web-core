import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  name: 'NsButton',
  setup(_props, { attrs }) {
    return <Button {...attrs}></Button>
  }
})
