<script setup>
import { ref } from 'vue';

const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  tags: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['submit', 'cancel'])

const productFormRef = ref(null)

const requiredRule = (v) => {
  return !!v || 'This field is required'
}

const handelOnSave = async () => {
  const { valid } = await productFormRef.value.validate()
  if (valid) {
    emit('submit')
  }
}

const handelOnCancel = () => {
  emit('cancel')
}

</script>

<template>
  <v-form
    ref="productFormRef"
    @submit.prevent="handelOnSave()">
    <v-row class="my-1">
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="product-name-input"> Name </label>
        <v-text-field
          id="product-name-input"
          v-model="props.form.name"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="product-name-price"> Price </label>
        <v-text-field
          id="product-name-price"
          v-model="props.form.price"
          type="number"
          :rules="[requiredRule]"
          density="compact"
          variant="outlined"
          hide-spin-buttons />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="product-name-category"> Category </label>
        <v-autocomplete
          id="product-name-category"
          v-model="props.form.category"
          :rules="[requiredRule]"
          :items="props.categories"
          item-title="name"
          item-value="_id"
          density="compact"
          variant="outlined" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="py-1">
        <label for="product-name-tags"> Tags </label>
        <v-autocomplete
          id="product-name-tags"
          v-model="props.form.tags"
          :items="props.tags"
          item-title="name"
          item-value="_id"
          density="compact"
          variant="outlined"
          multiple />
      </v-col>
    </v-row>
    <div class="d-flex py-2 ga-2">
      <v-btn
        type="submit"
        color="primary"
        variant="flat">
        Submit
      </v-btn>
      <v-btn
        variant="outlined"
        @click="handelOnCancel()">
        Cancel
      </v-btn>
    </div>
  </v-form>
</template>

<style scoped>
</style>