<template>

  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>

</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Voronet',
    setup () {
    },
  })
</script>

<style scoped>
  img {
    width: 200px;
  }
  h1 {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
