import type { Account } from '@/stores/accounts'
import type { Ref } from 'vue'

export const ERROR_MESSAGES = {
  LOGIN_REQUIRED: 'Логин обязателен',
  LOGIN_MAX_LENGTH: 'Максимум 100 символов',
  LABEL_MAX_LENGTH: 'Максимум 50 символов',
  PASSWORD_REQUIRED: 'Пароль обязателен',
  PASSWORD_MAX_LENGTH: 'Максимум 100 символов',
} as const

export const validateAccount = (accounts: Ref<Account[]>, account: Account): boolean => {
  const errors: { [key: string]: string } = {}

  if (!account.login.trim()) {
    errors.login = ERROR_MESSAGES.LOGIN_REQUIRED
  } else if (account.login.length > 100) {
    errors.login = ERROR_MESSAGES.LOGIN_MAX_LENGTH
  }

  if (account.label.length > 50) {
    errors.label = ERROR_MESSAGES.LABEL_MAX_LENGTH
  }

  if (account.type === 'Локальная') {
    if (!account.password) {
      errors.password = ERROR_MESSAGES.PASSWORD_REQUIRED
    } else if (account.password.length > 100) {
      errors.password = ERROR_MESSAGES.PASSWORD_MAX_LENGTH
    }
  }

  const index = accounts.value.findIndex((acc) => acc.id === account.id)
  if (index !== -1) {
    accounts.value[index].errors = errors
  }

  return Object.keys(errors).length === 0
}
