import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, Length } from 'class-validator'
import { Type } from 'class-transformer';
import { QueryPageDto } from 'src/common/model/page.dto';

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
    description: '密码不能为空,长度应在6-20位之间',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
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

