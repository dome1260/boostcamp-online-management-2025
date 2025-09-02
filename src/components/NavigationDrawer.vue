<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

const menus = [
  {
    title: 'Product',
    icon: 'mdi-package-variant-closed',
    root: '',
    sub: [
      {
        title: 'Product List',
        to: 'ProductList',
        root: 'ProductPage'
      },
      {
        title: 'Category',
        to: 'CategoryPage',
        root: 'CategoryPage'
      },
      {
        title: 'Tag',
        to: 'TagPage',
        root: 'TagPage'
      }
    ]
  },
  {
    title: 'User',
    icon: 'mdi-account-outline',
    to: 'UserPage',
    root: 'UserPage',
    sub: []
  }
]
</script>

<template>
  <v-navigation-drawer>
    <template
      v-for="(menu, i) in menus"
      :key="i">
      <v-list>
        <v-list-group v-if="menu.sub.length">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="menu.icon"
              :title="menu.title" />
          </template>
          <v-list-item
            v-for="(subMenu, j) in menu.sub"
            :key="j"
            :title="subMenu.title"
            :to="{ name: subMenu.to }"
            :active-class="route.meta?.root === subMenu.root ? 'bg-grey' : ''" />
        </v-list-group>
        <v-list-item
          v-else
          :prepend-icon="menu.icon"
          :title="menu.title"
          :to="{ name: menu.to }"
          :active-class="route.meta?.root === menu.root ? 'bg-grey' : ''" />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
