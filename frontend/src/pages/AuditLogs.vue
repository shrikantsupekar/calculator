<template>
  <div class="container">
    <div class="viewer">
      <pre><code ref="jsonBlock" class="json"></code></pre>

      <!-- PAGINATION -->
      <div class="pagination">
        <button :disabled="pagination.page <= 1" @click="prevPage">Prev</button>

        <span>Page {{ pagination.page }} / {{ pagination.totalPages }}</span>

        <button :disabled="!pagination.hasNextPage" @click="nextPage">Next</button>
      </div>
    </div>
    <div class="show-calculator-btn">
      <RouterLink to="/">
        <button>Calculator</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import config from '@/config'

const jsonBlock = ref<HTMLElement | null>(null)

const userId = localStorage.getItem('userId') || crypto.randomUUID()
localStorage.setItem('userId', userId)

const data = ref<Record<string, unknown>[]>([])
const pagination = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
})

// Change this to your API URL

async function loadData() {
  const url = `${config.API_URL}/logs?page=${pagination.value.page}&limit=${pagination.value.limit}`

  const res = await fetch(url)
  const jsonData = await res.json()

  data.value = jsonData.data
  pagination.value = jsonData.pagination

  renderJson(data.value)
}

function renderJson(obj: unknown) {
  if (!jsonBlock.value) {
    return
  }

  jsonBlock.value.textContent = JSON.stringify(obj, null, 2)
}

function nextPage() {
  pagination.value.page++
  loadData()
}

function prevPage() {
  pagination.value.page--
  loadData()
}

onMounted(loadData)

// Re-highlight JSON when page changes
watch(() => pagination.value.page, loadData)
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.viewer {
  width: 100%;
  max-width: 500px;
  height: 100%;
}
pre {
  background: #f6f8fa;
  border-radius: 8px;
  padding: 16px;
  overflow: auto;
  font-size: 14px;
  min-height: calc(100% - 70px);
  max-height: calc(100% - 70px);
  overflow-y: scroll;
}

.pagination {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}

button {
  padding: 6px 14px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.show-calculator-btn {
  position: fixed;
  right: 0px;
  bottom: 0px;
  padding: 10px;
}
.show-calculator-btn button {
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
