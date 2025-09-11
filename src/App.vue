<template>
  <div class="app-container">
    <div class="header">
      <h1>Учетные записи</h1>
      <el-button type="primary" @click="addAccount" icon="Plus"> Добавить </el-button>
    </div>

    <div class="hint">
      <el-text type="info">
        В поле "Метка" вводите текстовые метки через знак ; (максимум 50 символов)
      </el-text>
    </div>

    <el-table :data="accounts" class="accounts-table"  >
      <el-table-column label="Метки" width="200">
        <template #default="{ row }">
          <el-input
            v-model="row.label"
            placeholder="метка1; метка2"
            :maxlength="50"
            @blur="updateAccount(row)"
             :class="{ 'is-error': row.errors?.label }"
          />
           <div v-if="row.errors?.label" class="error-message">
            {{ row.errors.label }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Тип записи" width="150">
        <template #default="{ row }">
          <el-select v-model="row.type" @change="updateAccount(row)" placeholder="Выберите тип">
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
            :class="{ 'is-error': row.errors?.login }"
          />
          <div v-if="row.errors?.login" class="error-message">
            {{ row.errors.login }}
          </div>
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
            :class="{ 'is-error': row.errors?.password }"
          />
          <span v-else>-</span>
          <div v-if="row.errors?.password" class="error-message">
            {{ row.errors.password }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="100">
        <template #default="{ row }">
          <el-button type="danger" @click="removeAccount(row.id)" icon="Delete" text />
        </template>
      </el-table-column>

  <template #empty>
    <div class="empty-state">
      <p>Нет учетных записей</p>
      <el-button type="primary" @click="addAccount" icon="Plus">
        Добавить первую запись
      </el-button>
    </div>
  </template>

    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from './stores/accounts'
const { accounts, addAccount, removeAccount, updateAccount } = useAccountStore()

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

.accounts-table {
  margin-top: 20px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
  color: var(--el-text-color-secondary);
}

.empty-state p {
  margin-bottom: 20px;
  font-size: 14px;}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
  height: 18px;
}

:deep(.el-table td) {
  vertical-align: top;
  padding-bottom: 8px;
}

:deep(.el-table .cell) {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
