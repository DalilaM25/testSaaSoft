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

     <el-table :data="accounts" class="accounts-table">
      <el-table-column label="Метки" width="200">
        <template #default="{ row }">
          <el-input
            v-model="row.label"
            placeholder="метка1; метка2"
            :maxlength="50"
            @blur="updateAccount(row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="Тип записи" width="150">
        <template #default="{ row }">
          <el-select
            v-model="row.type"
            @change="updateAccount(row)"
            placeholder="Выберите тип"
          >
            <el-option label="LDAP" value="LDAP" />
            <el-option label="Локальная" value="Локальная" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="Логин" width="200">
        <template #default="{ row }">
          <el-input
            v-model="row.login"
            placeholder="Введите логин"
            :maxlength="100"
            @blur="updateAccount(row)"
          />
        </template>
      </el-table-column>

      <el-table-column label="Пароль" width="200">
        <template #default="{ row }">
          <el-input
            v-if="row.type === 'Локальная'"
            v-model="row.password"
            type="password"
            placeholder="Введите пароль"
            :maxlength="100"
            @blur="updateAccount(row)"
          />
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column  width="100">
        <template #default="{ $index }">
          <el-button
            type="danger"
            @click="removeAccount($index)"
            icon="Delete"
            text
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore, type Account } from './stores/accounts'
import { computed } from 'vue'

const store = useAccountStore()
const addAccount = () => {
  store.addAccount()
}
const removeAccount = (index: string) => {
  store.removeAccount(index)
}

const updateAccount = (account: Account) => {
  store.updateAccount(account)
}
const accounts = computed(() => store.accounts)
</script>

<style scoped>
.app-container {
  max-width: 900px;
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
