<style src="./mbutton.scss" module lang="scss"></style>
<script src="./mbutton.ts"></script>

<template>
  <p>( {{ message }} )</p>
  <button :disabled="props.isLoading" @click="onClick">
    <slot v-if="!props.isLoading" />
    <span v-if="props.isLoading">... processing</span>
  </button>
</template>
