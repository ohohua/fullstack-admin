/**
 * @description: 全局响应体
 */
export interface Response<T = any> {
  code: number // 状态码
  data?: T // 业务数据
  message: string // 响应信息
}
/**
 * 分页基础参数（页码、页大小）
 * - page: 页码（默认1，从1开始）
 * - pageSize: 每页条数（默认10，范围1-100）
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}
/**
 * 分页查询结果
 * @template T 列表项类型（如用户、角色等实体）
 */
export interface PaginationResult<T> {
  list: T[]; // 当前页数据列表
  total: number; // 总条数
  page: number; // 当前页码（实际使用的页码，默认1）
  pageSize: number; // 实际使用的页大小（默认10）
}
