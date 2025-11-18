<template>
  <div class="container">
    <div class="calculator">
      <div class="output">
        <input
          type="text"
          v-model="input"
          ref="inputRef"
          @keypress="allowCalcKeys"
          @blur="inputRef.focus()"
        />
      </div>
      <div class="calculator-container">
        <CalcButton
          v-for="btn in keys"
          class="glass"
          :key="btn.label"
          :type="btn.label"
          :style="btn.style"
          @clicked="onButtonPress(btn.label)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CalcButton from '@/components/CalcButton.vue'

const input = ref('')
const inputRef = ref(null)

// keys with layout properties like width or grid span
const keys = [
  { label: '7' },
  { label: '8' },
  { label: '9' },
  { label: '/', style: 'background: rgba(46, 204, 113, 0.5);' },
  { label: '4' },
  { label: '5' },
  { label: '6' },
  { label: '*', style: 'background: rgba(255, 127, 53, 0.5)' },
  { label: '1' },
  { label: '2' },
  { label: '3' },
  { label: '-', style: 'background: rgba(231, 76, 60, 0.7);' },
  { label: '0', style: 'grid-column: span 2' },
  { label: '.' },
  { label: '+', style: 'background: rgba(241, 196, 15, 0.5)' },
  { label: '=', style: 'grid-column: span 4' },
]

const onButtonPress = (value) => {
  if (value === '=') {
    try {
      input.value = eval(input.value)
    } catch {
      input.value = 'Error'
    }
  } else if(value !== input.value[input.value.length-1] || !['+','.','/','*','-'].includes(value)) {
    input.value += value
  }
}

const allowedKeys = /^[0-9+\-*/.]$/

function allowCalcKeys(e) {
  // If character NOT allowed → block it
  if (!allowedKeys.test(e.key)) {
    e.preventDefault()
    if (e.key === '=') {
      onButtonPress('=')
    }
  }
}

onMounted(() => {
  inputRef.value.focus()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.calculator {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border: 1px solid #afdbf5;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background: #f0f8ff;
}
.calculator-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: 100%;
}

.output {
  padding: 10px;
  background: #afdbf5;
  border: 1px solid #afdbf5;
  font-size: 22px;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 10px;
}
.output input {
  width: 100%;
  border: none;
  font-size: 22px;
  outline: none;
  text-align: right;
  background: transparent;
  font-weight: bolder;
}
.glass {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 25px;
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>
