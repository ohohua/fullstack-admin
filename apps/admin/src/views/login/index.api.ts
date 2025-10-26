import http from '@/utils/axios'

export interface PublicKey {
  publicKey: string
}

export class Api {
  /**
   * 获取公钥
   */
  static getPublicKey() {
    return http.get<PublicKey>('/auth/public-key')
  }
}
