import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/common/decorators/auth.decorator'
import { MenuService } from './menu.service'
import { AddOrUpdateMenuDto, QueryMenuPageDto } from './model/menu.dto'
import { MenuInfoVo, MenuListVo } from './model/menu.vo'

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @ApiOperation({ summary: '菜单信息' })
  @ApiResponse({ type: MenuInfoVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('info/:id')
  async info(@Param('id') id: string) {
    return await this.menuService.info(id)
  }

  @ApiOperation({ summary: '菜单列表' })
  @ApiResponse({ type: MenuListVo, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Get('list')
  async list(@Query() query: QueryMenuPageDto) {
    return await this.menuService.list(query)
  }

  @ApiOperation({ summary: '新增菜单' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Post()
  async insert(@Body() dto: AddOrUpdateMenuDto) {
    return await this.menuService.addOrUpdate(dto)
  }

  @ApiOperation({ summary: '更新菜单' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Put()
  async update(@Body() dto: AddOrUpdateMenuDto) {
    return await this.menuService.addOrUpdate(dto)
  }

  @ApiOperation({ summary: '删除菜单' })
  @ApiResponse({ type: String, status: HttpStatus.OK, description: '请求成功' })
  @Auth()
  @Delete(':id')
  async del(@Param('id') id: string) {
    return await this.menuService.del(id)
  }
}
