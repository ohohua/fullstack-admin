import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MinioModule } from './common/minio/minio.module'
import { GlobalModule } from './modules/global/global.module'
import { MenuModule } from './modules/menu/menu.module'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    GlobalModule,
    UserModule,
    MinioModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
