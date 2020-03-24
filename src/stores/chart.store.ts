import { scaleLinear, scaleBand } from 'd3-scale'
import { max, min } from 'd3-array'

import { PersistentStore } from "./abstract.store"

function randomize() {
  return [
    {
      name: 'Cars',
      amount: Math.floor(Math.random() * 60 + 10),
    },
    {
      name: 'Planes',
      amount: Math.floor(Math.random() * 60 + 10),
    },
    {
      name: 'Ships',
      amount: Math.floor(Math.random() * 60 + 10),
    },
    {
      name: 'Rockets',
      amount: Math.floor(Math.random() * 60 + 10),
    },
  ]
}

interface Chart extends Object {
  count: number,
  svgWidth: number,
  svgHeight: number,
  chartData: Array<Object>,
  dataMin: number,
  dataMax: number,
  xScale: Object,
  yScale: Object,
  xKey: String,
  yKey: String,
  barData: Array<Object>,
}

class ChartStore extends PersistentStore<Chart> {

  /* a simple example of how to use TypeScript to create a strict type for our store */
  protected data(): Chart {
    return {
      count: 0,
      svgWidth: 0,
      svgHeight: 0,
      chartData: [],
      dataMin: 0,
      dataMax: 0,
      xScale: () => {},
      yScale: () => {},
      xKey: '',
      yKey: '',
      barData: [],
    }
  }

  incrementCount() {
    this.state.count++
  }

  randomize() {
    this.state.barData = randomize()
  }

  resetChart({ svgWidth, chartData, xKey, yKey }) {
    this.state.svgWidth = svgWidth
    this.state.svgHeight = svgWidth / 1.61803398875 // golden ratio
    this.state.dataMax = max(chartData, d => d[yKey])
    this.state.dataMin = min(chartData, d => d[yKey])

    this.state.chartData = chartData
    this.state.xKey = xKey
    this.state.yKey = yKey

    this.state.xScale = scaleBand()
      .rangeRound([0, svgWidth])
      .padding(0.1)
      .domain(
        chartData.map(d => d[xKey])
      )

    const dataMin = this.state.dataMin
    const dataMax = this.state.dataMax
    this.state.yScale = scaleLinear()
      .rangeRound([this.state.svgHeight, 0])
      .domain([dataMin > 0 ? 0 : dataMin, dataMax])
  }

}

export const chartStore = new ChartStore('chartStore')
