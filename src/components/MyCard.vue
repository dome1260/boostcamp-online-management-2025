<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  }
})
</script>

<template>
  <div class="card">
    <slot
      name="title"
      :title="props.title">
      <h1> {{ props.title }} </h1>
    </slot>
    <p>
      <slot>
        Body
      </slot>
    </p>
    <hr class="my-2">
    <p>
      <slot name="footer">
        Footer
      </slot>
    </p>
  </div>
</template>

<style scoped>
.card {
  width: fit-content;
  border: 1px solid #000000;
  border-radius: 16px;
  padding: 16px;
}
</style>
