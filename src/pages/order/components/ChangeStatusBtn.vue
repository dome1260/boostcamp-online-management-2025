<script setup>
import { computed } from 'vue';
import ConsentConfirm from '../../../components/ConsentConfirm.vue';

const props = defineProps({
  status: {
    type: String,
    default: 'PENDING'
  }
})

const emit = defineEmits(['update:status'])

const statusInfo = computed(() => {
  switch (props.status) {
    case 'PENDING':
      return {
        text: 'Order Checked',
        color: 'warning',
        value: 'PENDING_SHIPMENT'
      }
    case 'PENDING_SHIPMENT':
      return {
        text: 'SHIPPED',
        color: 'yellow-accent-4',
        value: 'SHIPPED'
      }
    case 'SHIPPED':
      return {
        text: 'FINISHED',
        color: 'success',
        value: 'FINISHED'
      }
    default:
      return {
        text: '',
        color: '',
        value: ''
      }
  }
})

const handleUpdateStatus = (newStatus) => {
  emit('update:status', newStatus)
}
</script>

<template>
  <div>
    <ConsentConfirm @confirm="handleUpdateStatus(statusInfo.value)">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          variant="outlined"
          :color="statusInfo.color">
          {{ statusInfo.text }}
        </v-btn>
      </template>
    </ConsentConfirm>
  </div>
</template>

<style scoped>
</style>