import type { RouteRecordRaw } from 'vue-router'
import { LOGIN_ROUTE_PATH } from '@/router/routes'
import http from '@/utils/axios'
import { encryptWithPublicKey } from '@/utils/encrypt'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export interface UserInfo {
  nickname: string
  token: string
  roles: string[]
  codes: string[]
}

export interface UserLoginPayload {
  username: string
  password: string
  [x: string]: any
}

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)
  const homePath = '/home' // 当前用户的首页路径
  const routes = ref<RouteRecordRaw[]>([]) // 当前角色拥有的路由，Admin 中根据此数据生成菜单

  const user = ref<UserInfo>({
    nickname: '',
    roles: [],
    codes: [],
    token: localStorage.getItem('token') ?? '',
  })

  async function fetchUpdateUserInfo() {
    try {
      const { data } = await Api.queryUserInfo()
      user.value = {
        ...user.value,
        ...data,
      }
      return user.value
    }
    catch (error) {
      console.error(error)
      logout()
      return user.value
    }
  }

  async function login(payload: UserLoginPayload) {
    try {
      loading.value = true
      const { data } = await Api.getPublicKey()
      const newPassword = encryptWithPublicKey(payload.password, data.publicKey)
      const res = await Api.login({ ...payload, password: newPassword ?? '' })
      const token = user.value.token = res.data.token
      localStorage.setItem('token', token)
      const info = await fetchUpdateUserInfo()
      const redirect = route.query.redirect as string ?? homePath
      await router.push(redirect)
      return info
    }
    finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = {
      nickname: '',
      token: '',
      roles: [],
      codes: [],
    }
    localStorage.removeItem('token')
  }

  async function logoutWithQueryRedirect(redirect?: string) {
    logout()
    return router.push({
      path: LOGIN_ROUTE_PATH,
      query: {
        redirect: redirect ?? route.fullPath,
      },
    })
  }

  return {
    login,
    logout,
    routes,
    homePath,
    fetchUpdateUserInfo,
    loginLoading: loading,
    logoutWithQueryRedirect,
    user: computed(() => user.value),
  }
})

class Api {
  static login(payload: UserLoginPayload) {
    return http<{ token: string }>({
      url: '/user/login',
      method: 'post',
      data: payload,
    })
  }

  static queryUserInfo() {
    return http<Omit<UserInfo, 'token'>>({
      url: '/user/info',
      method: 'get',
    })
  }

  static getPublicKey() {
    return http.get<{ publicKey: string }>('/auth/public-key')
  }
}
