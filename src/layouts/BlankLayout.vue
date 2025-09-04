<script setup>
import Snackbar from '../components/Snackbar.vue';
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<style scoped>
</style>
