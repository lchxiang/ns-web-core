import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import type { Ref } from 'vue'
export type CountDownState = 'stop' | 'counting' | 'finished'
export type CountDown = {
  currentCount: Ref<number>
  start: (num?: number) => void
  stop: (state?: CountDownState) => void
  countState: Ref<CountDownState>
}

export const useCountDown = (count: number, immediate = false): CountDown => {
  const currentCount = ref(count)
  const countState = ref<CountDownState>('stop')
  const { pause, resume } = useIntervalFn(
    () => {
      currentCount.value--
      if (currentCount.value <= 0) {
        stop('finished')
      }
    },
    1000,
    { immediate: false }
  )

  const start = (num?: number) => {
    if (countState.value !== 'counting') {
      countState.value = 'counting'
      if (num && typeof num === 'number') {
        currentCount.value = num
      }
      resume()
    }
  }

  const stop = (state: CountDownState = 'stop') => {
    countState.value = state
    pause()
  }
  if (immediate) {
    start()
  }
  return { currentCount, start, stop, countState }
}
