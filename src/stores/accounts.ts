import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Account {
  id: string
  label: string
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
}

export const useAccountStore = defineStore('accounts', ()=>{
  const accounts = ref<Account[]>([])
//TODO: добавить работу с localstor

const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      label: '',
      type: 'Локальная',
      login: '',
      password: ''
    }
    accounts.value.push(newAccount)
  }
 const removeAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
  }

   const updateAccount = (id: string, updates: Partial<Account>) => {
    const index = accounts.value.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updates }
    }
  }
  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount
  }
})
