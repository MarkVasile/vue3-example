import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'MButton',
  inheritAttrs: false,
  setup (props, { emit }) {

    /* local state, if you need anything */
    const local = reactive({
      message: 'Seed: (0)',
    })

    const onClick = async () => {
      local.message = 'Seed: ' + Math.random()
      emit('click')
    }

    return {
      /* in order to use destructuring, so we don't have to write `local.message` and such, in our HTML template,
         we have to use the `toRefs()` function to ensure that we don't lose reactivity
      */
      ...toRefs(local),
      props,
      onClick,
    }

  },
})
