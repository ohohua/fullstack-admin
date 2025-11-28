import { Module } from '@nestjs/common'
import { PermissionService } from '../permission/permission.service'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'

@Module({
  controllers: [MenuController],
  providers: [MenuService, PermissionService],
})
export class MenuModule { }
