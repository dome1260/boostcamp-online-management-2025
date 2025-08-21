<script setup>
const menus = [
  {
    title: 'User',
    icon: 'mdi-account',
    to: 'UserPage'
  }
]
</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        v-for="(menu, i) in menus"
        :key="`navigation-drawer-menu-item-${i + 1}`"
        :to="{ name: menu.to }">
        <template #prepend>
          <v-icon> {{ menu.icon }} </v-icon>
        </template>
        <v-list-item-title>
          {{ menu.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
