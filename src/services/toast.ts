// imports
import { app } from '@/main'

const lifeTime = 3000

export function toastInfo(body: string = ''): void {
  app.config.globalProperties.$toast.add({
    severity: 'info',
    detail: body,
    life: lifeTime
  })
}

export function toastWarn(body: string = ''): void {
  app.config.globalProperties.$toast.add({
    severity: 'warn',
    detail: body,
    life: lifeTime
  })
}

export function toastSuccess(body: string = ''): void {
  app.config.globalProperties.$toast.add({
    severity: 'success',
    detail: body,
    life: lifeTime
  })
}

export function toastError(body: string = ''): void {
  app.config.globalProperties.$toast.add({
    severity: 'error',
    detail: body,
    life: lifeTime
  })
}
