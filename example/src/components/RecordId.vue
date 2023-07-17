<!--
  - Copyright (c) TIKI Inc.
  - MIT license. See LICENSE file in root directory.
  -->

<script setup lang="ts">
defineProps({
  name: String,
  id: String
})
</script>

<template>
  <p class="record">• {{ name }} - {{ id }}</p>
</template>

<style scoped>
.record {
  text-align: left;
}
</style>
