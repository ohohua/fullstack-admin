import { Inject, Injectable } from '@nestjs/common'
import { Client } from 'clashofclans.js'

@Injectable()
export class CocService {
  @Inject('COC_CLIENT')
  private client: Client

  // 获取部落信息
  async getClan() {
    const res = await this.client.getClan('#2J9Q9888C')

    return res
  }

  getCurrentWar() {
    return this.client.getCurrentWar('#2J9Q9888C')
  }
}
