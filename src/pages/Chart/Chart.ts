import { defineComponent, inject, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { chartStore } from '@/stores/chart.store'

import MButton from '@/components/mbutton'
import BarChart from '@/components/barchart.vue'

/* Note that we can extract most of the logic out of `setup()` and even place them in modules */
const inc = async () => {
  chartStore.incrementCount()
}

const randomize = () => {
  chartStore.randomize()
  inc()
  /* suppose we're doing some async request here */
  return new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
}

export default defineComponent({
  name: 'Chart',
  components: { MButton, BarChart },
  setup (props, { emit }) {
    const route = useRoute()
    const globalState = inject('state') // global state if needed (just a demo of how to use `inject`)

    /* local state */
    const local = reactive({
      isLoading: false,
    })

    /* computed, onMounted, etc have to be inside the setup() function */
    const currentLocation = computed(() => {
      const { matched, ...rest } = route.value
      return rest
    })

    const update = () => {
      local.isLoading = true
      randomize()
        .then(() => {
          local.isLoading = false
        })
    }

    onMounted(() => {
      /* initial data setup, in this case just a random set of bars */
      update()
    })

    /* return everything you use in the HTML template */
    return {
      currentLocation,
      globalState, // if we need any global state
      state: chartStore.getState(),
      local,
      update,
    }
  },
})
