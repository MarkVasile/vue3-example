<template>
  <div id="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <svg :width="state.svgWidth" :height="state.svgHeight">
      <g>
      <!--
        We have to use state.svgWidth and such, because state is a computed property,
        and it's reactivity breaks if we pull out variables from it (destructure)
      -->
        <rect
          v-for="item in state.chartData"
          class="bar-positive"
          :key="item[state.xKey]"
          :x="state.xScale(item[state.xKey])"
          :y="state.yScale(0)"
          :width="state.xScale.bandwidth()"
          :height="0"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script>
import { computed, onMounted, nextTick } from 'vue'
import { selectAll } from 'd3-selection'
/* eslint-disable no-unused-vars */
import { transition } from 'd3-transition'

import { chartStore } from '@/stores/chart.store'

function AnimateLoad () {
  const { chartData, svgHeight, yKey, yScale } = chartStore.getState()
  const chartDataObj = chartData
  selectAll('rect')
    .data(chartData)
    .transition()
    .delay((d, i) => i * 150)
    .duration(1000)
    .attr('y', d => yScale(d[yKey]))
    .attr('height', d => svgHeight - yScale(d[yKey]))
}

function updateSVG ({ cname, ...rest }) {
  function setWidth () {
    const el = document.getElementById(cname)
    if (!el) return
    chartStore.resetChart({
      svgWidth: el.offsetWidth * 0.55,
      ...rest,
    })
    AnimateLoad()
  }

  function AddResizeListener () {
    window.addEventListener('resize', () => {
      setTimeout(setWidth, 300)
    })
  }

  setWidth()
  AddResizeListener()
}

/********************************************************
 * Component reactive component
 *******************************************************/
export default {
  name: 'BarChart',
  setup (props, context) {

    const updateChart = () => {
      updateSVG({
        cname: 'container',
        ...props,
      })
    }

    const state = computed(() => {
      updateChart()
      return chartStore.getState()
      /* we are returning the state as a reactive object, however, the vue3 reactivity breaks if you destructure the object.
      To have reactive objects after destructuring you must use the `ref()` or `toRefs()` function or convert the reactive object with `toRefs()`.
      Also keep in mind that you cannot use the `reactive()` function for primitives, only for objects.
      More chart this: https://forum.vuejs.org/t/vue-3-ref-vs-reactive/86680/4
      */
    })

    onMounted(() => {
      // we are using nextTick here because the HTML svg element is not ready yet, when component is mounted;
      // the SVG will be rendered as a result of setup(), so it will become available for selection at the nextTick
      nextTick(() => {
        updateChart()
      }, 300)
    })

    return {
      ...props,
      state,
    }
  },
}
</script>

<style scoped>
.bar-positive {
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: brown;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 100%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}
</style>
