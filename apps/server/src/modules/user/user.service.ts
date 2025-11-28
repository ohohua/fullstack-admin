import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { role, user, userRole } from '@ohohua/schema'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { AuthService } from 'src/modules/global/auth/auth.service'
import { decryptPassword } from 'src/utils/rsa'
import { PaginationService } from '../global/pagination/pagination.service'
import { DB, DbType } from '../global/providers/db.provider'
import { AddOrUpdateUserDto, LoginDto, QueryUserDto, RegisterDto } from './model/user.dto'
import { CryptoUtil } from 'src/utils/crypto'
import { USER_STATUS } from '@ohohua/common'

const logger = new Logger('UserService')
@Injectable()
export class UserService {
  @Inject(DB)
  private db: DbType

  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(AuthService)
  private authService: AuthService

  @Inject(PaginationService)
  private paginationService: PaginationService

  async addDefaultAdmin() {
    await this.db.insert(user).values({
      username: 'super',
      nickname: '超级管理员',
      password: '123456',
      email: 'ohohua@163.com',
      phone: '18900000000',
      gender: -1,
    })
  }

  async test() {
    try {
      // return await this.db.select().from(user).where(eq(user.id, ))
    }
    catch (e) {
      logger.error(e)
    }
  }

  async login(dto: LoginDto) {
    const { username, password } = dto
    const privateKey = this.authService.getPrivateKey()
    const decryptedPassword = decryptPassword(password, privateKey)
    const hasUser = await this.db.select().from(user).where(eq(user.username, username))
    if (!hasUser.length) {
      throw new BadRequestException('用户不存在')
    }
    const loginUser = hasUser[0]
    const isVerify = await CryptoUtil.verify(decryptedPassword, loginUser.password)
    if (!isVerify) {
      throw new BadRequestException('密码错误')
    }

    if (loginUser.status !== USER_STATUS.ENABLE) {
      throw new BadRequestException('该用户已禁用')
    }

    return {
      token: this.jwtService.sign({ id: loginUser.id, username: loginUser.username }, {
        expiresIn: '7d',
      }),
    }
  }

  async register(dto: RegisterDto) {
    const { username, password } = dto
    const privateKey = this.authService.getPrivateKey()
    const decryptedPassword = decryptPassword(password, privateKey)
    // const decryptedPassword = password
    const hasUser = await this.db.select().from(user).where(eq(user.username, username)).limit(1)
    if (hasUser.length) {
      throw new BadRequestException('用户已存在')
    }
    const passwordHashed = await CryptoUtil.encrypt(decryptedPassword)

    await this.db.insert(user).values({ ...dto, password: passwordHashed })
    return '注册成功'
  }

  async info(userId: string) {
    const userList = await this.db.select().from(user).where(eq(user.id, userId))
    if (userList.length) {
      const queryUser = userList[0]
      const userRoleList = await this.db.select()
        .from(userRole)
        .where(eq(userRole.userId, queryUser.id))
        .leftJoin(role, eq(userRole.roleId, role.id))
      logger.log(userRoleList)
      const roles = ['super', 'admin']
      const codes = []

      return {
        id: queryUser.id,
        username: queryUser.username,
        nickname: queryUser.nickname,
        email: queryUser.email,
        phone: queryUser.phone,
        gender: queryUser.gender,
        roles,
        codes,
      }
    }
  }

  async list(query: QueryUserDto) {
    const { page, pageSize, username, nickname, gender, status } = query

    const conditions = [
      this.paginationService.likeCondition(user.username, username),
      this.paginationService.likeCondition(user.nickname, nickname),
      this.paginationService.eqCondition(user.gender, gender),
      this.paginationService.eqCondition(user.status, status),
    ].filter(Boolean)

    const where = conditions.length > 0 ? and(...conditions) : undefined

    const { password, ...rest } = getTableColumns(user)

    return this.paginationService.paginate(
      user,
      {
        page,
        pageSize,
      },
      where,
      {
        columns: { ...rest },
        orderBy: { createTime: 'desc' },
      },
    )
  }

  async addOrUpdate(dto: AddOrUpdateUserDto) {
    const { id, ...rest } = dto
    if (id) {
      return await this.db.update(user).set({ ...rest }).where(eq(user.id, id))
    }
    else {
      return await this.db.insert(user).values({ ...rest })
    }
  }
}
