<style src="./Chart.scss" module lang="scss"></style>
<script src="./Chart.ts"></script>

<template>
  <div>
    <div>
      <!-- How to pass properties to components:
        pass reactive variables using :propName='varName' and static strings or numbers without the semicolon -->
      <BarChart title="Bar Chart" :chartData="state.barData" xKey="name" yKey="amount" />
      <h1>Hello Vue 3!</h1>
      <m-button @click="update" :isLoading="local.isLoading">Clicked {{ state.count }} times.</m-button>
    </div>
  </div>

  <div>
    <p>Vue Router Usage</p>
    {{ currentLocation }}
  </div>
</template>
