import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { role, user, userRole } from '@ohohua/schema'
import { eq, like, and, getTableColumns, sql } from 'drizzle-orm'
import { AuthService } from 'src/modules/global/auth/auth.service'
import { decryptPassword } from 'src/utils/rsa'
import { DB, DbType } from '../global/providers/db.provider'
import { LoginDto, QueryUserDto, RegisterDto } from './model/user.dto'
import { cond, isNil } from 'lodash-es'

const logger = new Logger('UserService')
@Injectable()
export class UserService {
  @Inject(DB)
  private db: DbType

  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(AuthService)
  private authService: AuthService

  async addDefaultAdmin() {
    await this.db.insert(user).values({
      username: 'super',
      nickname: '超级管理员',
      password: '123455',
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
    if (decryptedPassword !== loginUser.password) {
      throw new BadRequestException('密码错误')
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
    const hasUser = await this.db.select().from(user).where(eq(user.username, username))
    if (hasUser.length) {
      throw new BadRequestException('用户已存在')
    }
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
    const offset = (page - 1) * pageSize

    const usernameClause = username ? like(user.username, `%${username}%`) : void 0;
    const nicknameClause = nickname ? like(user.nickname, `%${nickname}%`) : void 0;
    const genderClause = gender !== void 0 ? eq(user.gender, gender) : void 0
    const statusClause = status !== void 0 ? eq(user.status, status) : void 0

    const { password, ...rest } = getTableColumns(user)

    const users = await this.db.select(
      {
        ...rest,
        total: sql<number>`COUNT(*) OVER()`, // 使用窗口函数计算总数
      }
    )
      .from(user)
      .where(and(usernameClause, nicknameClause, genderClause, statusClause))
      .limit(pageSize)
      .offset(offset)

    const list = users.map(({ total, ...item }) => item)
    const total = users.length > 0 ? users[0].total : 0

    return {
      list,
      total
    }
  }
}
