import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Account {
  id: string
  label: string | null
  type: 'LDAP' | 'Локальная'
  login: string
  password: string
}

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  //TODO: добавить работу с localstor

  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      label: '',
      type: 'Локальная',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
  }
  const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)
  }

  const updateAccount = (updatedAccount: Account) => {
    const index = accounts.value.findIndex((account) => account.id === updatedAccount.id)
    if (index !== -1) {
      accounts.value[index] = { ...updatedAccount }
    }
  }
  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
  }
})
