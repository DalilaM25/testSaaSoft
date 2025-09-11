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

    <div class="accounts-container">
      <div class="columns-header">
        <div class="header-cell" style="flex: 2">Метки</div>
        <div class="header-cell" style="flex: 1">Тип записи</div>
        <div class="header-cell" style="flex: 1">Логин</div>
        <div class="header-cell" style="flex: 1">Пароль</div>
        <div class="header-cell" style="flex: 0 0 60px"></div>
      </div>
      <form
        v-for="account in accounts"
        :key="account.id"
        :id="`account-form-${account.id}`"
        class="account-form"
        @submit.prevent="handleSubmit(account)"
      >
        <div class="form-row">
          <div class="form-cell">
            <el-input
              v-model="account.label"
              placeholder="метка1; метка2"
              :maxlength="50"
              @blur="updateAccount(account)"
              :class="{ 'is-error': account.errors?.label }"
              :form="`account-form-${account.id}`"
            />
            <div v-if="account.errors?.label" class="error-message">
              {{ account.errors.label }}
            </div>
          </div>

          <div class="form-cell">
            <el-select
              v-model="account.type"
              @change="updateAccount(account)"
              placeholder="Выберите тип"
              :form="`account-form-${account.id}`"
            >
              <el-option label="LDAP" value="LDAP" />
              <el-option label="Локальная" value="Локальная" />
            </el-select>
          </div>

          <div class="form-cell">
            <el-input
              v-model="account.login"
              placeholder="Введите логин"
              :maxlength="100"
              @blur="updateAccount(account)"
              :class="{ 'is-error': account.errors?.login }"
              :form="`account-form-${account.id}`"
            />
            <div v-if="account.errors?.login" class="error-message">
              {{ account.errors.login }}
            </div>
          </div>

          <div class="form-cell">
            <el-input
              v-if="account.type === 'Локальная'"
              v-model="account.password"
              :type="passwordVisible[account.id] ? 'text' : 'password'"
              placeholder="Введите пароль"
              :maxlength="100"
              @blur="updateAccount(account)"
              :class="{ 'is-error': account.errors?.password }"
              :form="`account-form-${account.id}`"
            >
              <template #suffix>
                <el-icon
                  v-if="account.type === 'Локальная'"
                  class="password-eye"
                  @click="togglePasswordVisibility(account.id)"
                  :style="{ cursor: 'pointer' }"
                >
                  <View v-if="passwordVisible[account.id]" />
                  <Hide v-else />
                </el-icon>
              </template>
            </el-input>
            <span v-else>-</span>
            <div v-if="account.errors?.password" class="error-message">
              {{ account.errors.password }}
            </div>
          </div>

          <div class="form-cell">
            <el-button type="danger" @click="removeAccount(account.id)" icon="Delete" text />
          </div>
        </div>
      </form>

      <div v-if="accounts.length === 0" class="empty-state">
        <p>Нет учетных записей</p>
        <el-button type="primary" @click="addAccount" icon="Plus">
          Добавить первую запись
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore, type Account } from './stores/accounts'
const { accounts, addAccount, removeAccount, updateAccount } = useAccountStore()

const handleSubmit = (account: Account) => {
  updateAccount(account)
}

const passwordVisible = ref<{ [key: string]: boolean }>({})
const togglePasswordVisibility = (accountId: string) => {
  passwordVisible.value[accountId] = !passwordVisible.value[accountId]
}
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

.accounts-container {
  margin-top: 20px;
}

.columns-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background-color: #f5f7fa;
  border: 1px solid #ebeef5;
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  font-weight: 600;
  color: #606266;
}

.header-cell {
  flex: 1;
  min-width: 0;
  font-size: 14px;
}

.account-form {
  padding: 16px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
}

.form-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.form-cell {
  flex: 1;
  min-width: 0;
}

.form-cell:first-child {
  flex: 2;
}
.form-cell:last-child {
  flex: 0 0 60px;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
  color: var(--el-text-color-secondary);
}

.empty-state p {
  margin-bottom: 20px;
  font-size: 14px;
}

.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
  height: 18px;
}

.account-form:hover {
  background-color: #fafafa;
}

.password-eye {
  color: #909399;
  transition: color 0.2s;
}

.password-eye:hover {
  color: #409eff;
}
</style>
