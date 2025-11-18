<template>
    <button class="btn" @click="emitClick">
      {{ type }}
    </button>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(["clicked"])
  
  const emitClick = () => {
    // Emit event name based on type
    emit("clicked",props.type)
  }
  </script>
  
  <style scoped>
  .btn {
    padding: 20px;
    font-size: 20px;
    border: 1px solid #ddd;
    background: #f5f5f5;
    cursor: pointer;
  }
  .btn:active {
    background: #e2e2e2;
  }
  </style>
  