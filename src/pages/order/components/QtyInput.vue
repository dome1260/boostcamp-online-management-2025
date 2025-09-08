<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:model-value'])

const decrease = () => {
  const _value = Number(props.modelValue)
  if (_value > 1) {
    emit('update:model-value', _value - 1)
  }
}

const increase = () => {
  const _value = Number(props.modelValue)
  if (_value < 99) {
    emit('update:model-value', _value + 1)
  }
}

const handelInput = (_value) => {
  const newVal = Number(_value)
  if (typeof newVal !== 'number') {
    emit('update:model-value', 1)
  } else if (newVal > 99) {
    emit('update:model-value', 99)
  } else if (newVal < 1) {
    emit('update:model-value', 1)
  } else {
    emit('update:model-value', newVal)
  }
}

</script>

<template>
  <div class="d-flex align-center ga-4">
    <v-btn
      color="primary"
      height="32"
      variant="outlined"
      width="32"
      icon
      @click="decrease()">
      <v-icon> mdi-minus </v-icon>
    </v-btn>
    <v-text-field
      :model-value="props.modelValue"
      type="number"
      max-width="100"
      density="compact"
      variant="outlined"
      hide-details
      hide-spin-buttons
      @update:model-value="handelInput" />
    <v-btn
      color="primary"
      height="32"
      variant="flat"
      width="32"
      icon
      @click="increase()">
      <v-icon> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<style scoped>
:deep(.v-text-field input) {
  text-align: center;
}
</style>
