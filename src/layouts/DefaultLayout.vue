<script setup>
import Navbar from '../components/Navbar.vue'
import NavigationDrawer from '../components/NavigationDrawer.vue'
</script>

<template>
  <v-app>
    <NavigationDrawer />
    <Navbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
