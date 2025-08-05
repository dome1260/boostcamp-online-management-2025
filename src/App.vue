<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import DefaultLayout from './layouts/DefaultLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

const route = useRoute()

const layout = computed(() => route.meta?.layout || 'blank')
</script>

<template>
  <DefaultLayout v-if="layout === 'default'" />
  <BlankLayout v-else />
</template>

<style scoped>
</style>
