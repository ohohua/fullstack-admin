import { createOptionsAndMapping } from '@/utils/common'
import { USER_STATUS } from '@ohohua/common'

export const {
  options: genderOptions,
  mapping: genderMapping,
  mapping2: genderToColorMapping,
} = createOptionsAndMapping([
  ['1', 'common.status.male', 'success'],
  ['0', 'common.status.female', 'error'],
  ['-1', 'common.status.other', 'default'],
])

export const {
  options: statusOptions,
  mapping: statusMapping,
  mapping2: statusToColorMapping,
} = createOptionsAndMapping([
  [USER_STATUS.ENABLE, 'common.often.enable', 'success'],
  [USER_STATUS.DISABLE, 'common.often.disable', 'error'],
])
