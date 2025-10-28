import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { AddOrUpdateRoleDto, QueryRolePageDto } from './model/role.dto'
import { RoleInfoVo, RoleListVo } from './model/role.vo'
import { RoleService } from './role.service'

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '角色信息' })
  @ApiResponse({ type: RoleInfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('info/:id')
  async info(@Param('id') id: string) {
    return await this.roleService.info(id)
  }

  @ApiOperation({ summary: '角色列表' })
  @ApiResponse({ type: RoleListVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('page')
  async list(@Query() query: QueryRolePageDto) {
    return await this.roleService.list(query)
  }

  @ApiOperation({ summary: '新增/编辑角色' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Post('addOrUpdate')
  async addOrUpdate(@Body() dto: AddOrUpdateRoleDto) {
    return await this.roleService.addOrUpdate(dto)
  }

  @ApiOperation({ summary: '删除角色' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Delete('del/:id')
  async del(@Param('id') id: string) {
    return await this.roleService.del(id)
  }
}
