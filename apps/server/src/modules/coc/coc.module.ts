import { FactoryProvider, Module } from '@nestjs/common'
import { Client } from 'clashofclans.js'
import { CocController } from './coc.controller'
import { CocService } from './coc.service'

@Module({
  controllers: [CocController],
  providers: [
    CocService,
    {
      provide: 'COC_CLIENT',
      async useFactory(): Promise<Client> {
        const client = new Client({
          keys: [process.env.COC_API_KEY!],
        })

        return client
      },
    },
  ],
})
export class CocModule { }
