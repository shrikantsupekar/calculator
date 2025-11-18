<template>
  <div class="container">
    <div class="calculator">
      <div class="output">
        <input
          type="text"
          v-model="input"
          ref="inputRef"
          @keypress="allowCalcKeys"
          @blur="focusInput"
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
    <div class="show-logs-btn">
      <RouterLink to="/logs">
        <button>View Audit Logs</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CalcButton from '@/components/CalcButton.vue'
import config from '@/config'

const input = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const userId = localStorage.getItem('userId') || crypto.randomUUID()
localStorage.setItem('userId', userId)

// keys with layout properties like width or grid span
type CalcKey = {
  label: string
  style?: string
}

const keys: CalcKey[] = [
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

let currentNumber = ''

const operators = new Set<string>(['+', '-', '*', '/'])
const nonRepeatableKeys = new Set<string>(['+', '.', '/', '*', '-', '='])

const onButtonPress = (value: string) => {
  if (isNumericInput(value)) {
    appendToCurrentNumber(value)
  }

  if (value === '=') {
    handleEquals()
    return
  }

  if (operators.has(value)) {
    handleOperator(value)
  }

  appendToInput(value)
}

function isNumericInput(value: string) {
  return !isNaN(Number(value)) || value === '.'
}

function appendToCurrentNumber(value: string) {
  // build up the current multi-digit number, but don't log yet
  currentNumber += value
}

function handleEquals() {
  try {
    input.value = eval(input.value)
  } catch {
    input.value = 'Error'
  }

  flushCurrentNumber()
  addLog('equalsPressed', input.value)
}

function handleOperator(value: string) {
  // when an operator is pressed, log the completed number and the operator
  flushCurrentNumber()
  addLog('operatorEntered', value)
}

function flushCurrentNumber() {
  if (!currentNumber) {
    return
  }
  addLog('numberEntered', currentNumber)
  currentNumber = ''
}

function appendToInput(value: string) {
  const lastChar = input.value[input.value.length - 1]
  const isBlockedRepeat = lastChar === value && nonRepeatableKeys.has(value)

  if (!isBlockedRepeat) {
    input.value += value
  }
}

type LogEvent = 'numberEntered' | 'operatorEntered' | 'equalsPressed'

function addLog(action: LogEvent, value: string) {
  const id = getNextCounter()
  const timestamp = Date.now()

  const payload = {
    id: String(id),
    timestamp,
    event: action,
    value: String(value),
  }

  fetch(`${config.API_URL}/logs?userId=${encodeURIComponent(userId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // swallow logging errors
  })
}

function getNextCounter() {
  let counter = Number(localStorage.getItem('counter') || 0)
  counter++
  localStorage.setItem('counter', String(counter))
  return counter
}

const allowedKeys = /^[0-9+\-*/.]$/

function allowCalcKeys(e: KeyboardEvent) {
  // If character NOT allowed → block it
  if (!allowedKeys.test(e.key)) {
    e.preventDefault()
    if (e.key === '=') {
      onButtonPress('=')
    }
  } else {
    onButtonPress(e.key)
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  focusInput()
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

.show-logs-btn {
  position: fixed;
  right: 0px;
  bottom: 0px;
  padding: 10px;
}
.show-logs-btn button {
  color: blue;
  background: #ffffff;
  padding: 10px;
  font-size: 16px;
  border: 1px solid gray;
  font-weight: 400;
  border-radius: 6px;
  cursor: pointer;
}
</style>
