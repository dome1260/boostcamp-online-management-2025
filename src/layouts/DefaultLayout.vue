<script setup>
</script>

<template>
  <v-app>
    <v-navigation-drawer>
      <v-list>
        <v-list-item>
          Menu 1
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      Navbar
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
