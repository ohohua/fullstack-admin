import { Body, Controller, Delete, Get, HttpStatus, Post, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { UserInfo } from 'src/common/decorators/user-info.decorator'
import { AddOrUpdateUserDto, LoginDto, QueryUserDto, RegisterDto } from './model/user.dto'
import { InfoVo, LoginVo, RegisterVo } from './model/user.vo'
import { UserService } from './user.service'

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private service: UserService) { }

  @ApiOperation({ summary: '增加默认用户' })
  @Post('addDefaultAdmin')
  addDefaultAdmin() {
    return this.service.addDefaultAdmin()
  }

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }

  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: RegisterVo, status: HttpStatus.OK, description: '请求成功' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.service.register(dto)
  }

  @ApiOperation({ summary: '用户信息' })
  @ApiResponse({ type: InfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('info')
  async info(@UserInfo('id') userId: string) {
    return await this.service.info(userId)
  }

  @ApiOperation({ summary: '用户列表' })
  @ApiResponse({ type: InfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('page')
  async list(@Query() query: QueryUserDto) {
    return await this.service.list(query)
  }

  @ApiOperation({ summary: '新增/编辑用户' })
  @ApiResponse({ type: InfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Post('addOrUpdate')
  async addOrUpdate(@Body() dto: AddOrUpdateUserDto) {
    return await this.service.addOrUpdate(dto)
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ type: InfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Delete('add')
  async del(@Query() query: QueryUserDto) {
    return await this.service.list(query)
  }
}
