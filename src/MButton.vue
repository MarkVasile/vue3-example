<template>
  <button @click="onClick">{{localLoading}}<slot/></button>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'MButton',
  inheritAttrs: false,
  setup (props, { emit, listeners }) {
    const state = reactive({
      localLoading: false
    })

    console.log(listeners)

    const onClick = async () => {
      if (state.localLoading) {
        return
      }
      state.localLoading = true
      console.log('onclick')
      try {
        const res = await Promise.all(emit('click'))
        console.log(res)
      } finally {
        state.localLoading = false
      }
    }

    return {
      ...toRefs(state),
      onClick
    }
  }
}
</script>

<style></style>
