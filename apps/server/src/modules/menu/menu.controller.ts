import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleInfoVo, RoleListVo, QueryRolePageDto, AddOrUpdateRoleDto } from '../role/model/role.vo';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '菜单信息' })
  @ApiResponse({ type: RoleInfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('info/:id')
  async info(@Param('id') id: string) {
    return await this.menuService.info(id)
  }

  @ApiOperation({ summary: '菜单列表' })
  @ApiResponse({ type: RoleListVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('page')
  async list(@Query() query: QueryRolePageDto) {
    return await this.menuService.list(query)
  }

  @ApiOperation({ summary: '新增/编辑菜单' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Post('addOrUpdate')
  async addOrUpdate(@Body() dto: AddOrUpdateRoleDto) {
    return await this.menuService.addOrUpdate(dto)
  }

  @ApiOperation({ summary: '删除菜单' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Delete('del/:id')
  async del(@Param('id') id: string) {
    return await this.menuService.del(id)
  }
}
