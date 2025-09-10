<template>
  <div class="app-container">
    <div class="header">
      <h1>Учетные записи</h1>
      <el-button type="primary" @click="addAccount" icon="Plus">
        Добавить
      </el-button>
    </div>

    <div class="hint">
      <el-text type="info">
        В поле "Метка" вводите текстовые метки через знак ; (максимум 50 символов)
      </el-text>
    </div>

    <div class="accounts-list">

    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from './stores/accounts'
const store = useAccountStore()
const addAccount = () => {
  store.addAccount()
}
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.hint {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style>
