import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { validateAccount } from '../utils/validate'

export interface Account {
  id: string
  label: string
  labelArray: { text: string }[]
  type: 'LDAP' | 'Локальная'
  login: string
  password: string
  errors?: {
    label?: string
    login?: string
    password?: string
  }
}

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  const saveToStorage = () => {
    const dataToSave = accounts.value.map((account) => ({
      id: account.id,
      label: account.label,
      labelArray: account.labelArray,
      type: account.type,
      login: account.login,
      password: account.password,
    }))
    localStorage.setItem('accounts', JSON.stringify(dataToSave))
  }

  const loadFromStorage = () => {
    const stored = localStorage.getItem('accounts')
    if (stored) {
      const parsed = JSON.parse(stored)
      accounts.value = parsed.map((account: Account) => {
        const labelArray = account.labelArray || []
        const label =
          labelArray.length > 0
            ? labelArray.map((item: { text: string }) => item.text).join('; ')
            : account.label || ''
        return {
          ...account,
          label,
          labelArray,
          errors: {},
        }
      })
    }
  }

  loadFromStorage()
  watch(accounts, saveToStorage, { deep: true })

  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      label: '',
      labelArray: [],
      type: 'Локальная',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
  }
  const removeAccount = (id: string) => {
    const index = accounts.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      accounts.value.splice(index, 1)
    }
  }

  const parseLabels = (labelString: string) => {
    if (!labelString.trim()) return []

    return labelString
      .split(';')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((text) => ({ text }))
  }

  const updateAccount = (updatedAccount: Account) => {
    const index = accounts.value.findIndex((account) => account.id === updatedAccount.id)
    if (index !== -1) {
      const isValid = validateAccount(accounts, updatedAccount)
      if (isValid) {
        const labelsArray = parseLabels(updatedAccount.label)
        accounts.value[index] = {
          ...updatedAccount,
          labelArray: labelsArray,
        }
      } else {
        accounts.value[index] = {
          ...updatedAccount,
          errors: accounts.value[index].errors,
        }
      }
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount,
    validateAccount,
  }
})
