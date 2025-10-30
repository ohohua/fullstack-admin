import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length } from 'class-validator'
import { QueryPageDto } from 'src/common/model/page.dto'

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名不能为空,长度为2-20位',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  username: string

  @ApiProperty({
    example: '123456',
    description: '密码不能为空,长度应在6-20位之间',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}

export class RegisterDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名不能为空,长度为2-20位',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  username: string

  @ApiProperty({
    example: '123456',
    description: '密码不能为空',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @ApiProperty({ description: '昵称', required: true })
  @IsNotEmpty({ message: '昵称不能为空' })
  @Length(2, 20, { message: '昵称长度为2-20位' })
  nickname: string

  @ApiProperty({ description: '性别', required: true })
  @IsNotEmpty({ message: '性别不能为空' })
  gender: number

  @ApiProperty({ description: '邮箱', required: true })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail()
  email: string

  @ApiProperty({ description: '手机', required: true })
  @IsNotEmpty({ message: '手机号不能为空' })
  @IsPhoneNumber('CN', { message: '手机号格式不正确' })
  phone: string

  @ApiProperty({ description: '备注', required: false })
  remark: string

  @ApiProperty({ description: '状态', required: true })
  @IsNotEmpty({ message: '状态不能为空' })
  status: number
}

export class QueryUserDto extends QueryPageDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsOptional()
  username: string

  @ApiProperty({ description: '用户昵称', required: false })
  @IsOptional()
  nickname: string

  @ApiProperty({ description: '性别', required: false })
  @Type(() => Number)
  @IsOptional()
  gender: number

  @ApiProperty({ description: '状态', required: false })
  @Type(() => Number)
  @IsOptional()
  status: number
}

export class AddOrUpdateUserDto {
  @IsOptional()
  @ApiProperty({ description: '用户ID', required: false })
  id?: string

  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  @ApiProperty({ description: '用户名', required: true })
  username: string

  @IsNotEmpty({ message: '用户昵称不能为空' })
  @Length(2, 20, { message: '用户昵称长度为2-20位' })
  @ApiProperty({ description: '用户昵称', required: true })
  nickname: string

  @IsNotEmpty({ message: '性别不能为空' })
  @ApiProperty({ description: '性别', required: true })
  @Type(() => Number)
  gender: number

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(2, 20, { message: '用户密码长度为2-20位' })
  @ApiProperty({ description: '密码', required: true })
  password: string

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty({ description: '邮箱' })
  email: string

  @IsNotEmpty({ message: '手机号不能为空' })
  @ApiProperty({ description: '手机号', required: false })
  phone: string

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  remark?: string

  @IsNotEmpty({ message: '状态不能为空' })
  @ApiProperty({ description: '状态', required: true })
  @Type(() => Number)
  status: number

  @ApiProperty({ description: '所属角色', required: true })
  @IsNotEmpty({ message: '所属角色不能为空' })
  roles: string[]
}
