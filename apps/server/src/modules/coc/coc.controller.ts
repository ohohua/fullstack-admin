import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { InfoVo } from '../user/model/user.vo'
import { CocService } from './coc.service'

@Controller('coc')
export class CocController {
  constructor(private readonly service: CocService) { }

  @ApiOperation({ summary: '获取部落信息' })
  @ApiResponse({ type: InfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Get('getClan')
  @Auth()
  async info() {
    return await this.service.getClan()
  }

  @ApiOperation({ summary: '获取该部落当前正在进行的战争信息' })
  @ApiResponse({ type: InfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Get('getCurrentWar')
  @Auth()
  async getCurrentWar() {
    return await this.service.getCurrentWar()
  }
}
