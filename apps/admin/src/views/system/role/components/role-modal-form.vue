<script setup lang="ts">
import type { Menu } from '@/views/system/menu/index.api'
import type { Merge } from 'type-fest'
import { useProRequest } from '@/composables/use-pro-request'
import { translateOptions } from '@/utils/common'
import { Api as MenuApi } from '@/views/system/menu/index.api'
import { omit } from 'lodash-es'
import { statusOptions } from '../utils/constants'

type FlatMenu = Merge<Omit<Menu, 'meta'>, NonNullable<Menu['meta']>>

function flatMenu(menu: Menu[]): FlatMenu[] {
  return menu.map((it): FlatMenu => {
    const meta = (it.meta ?? {}) as NonNullable<Menu['meta']>
    return {
      ...omit(it, ['meta', 'children']),
      ...meta,
      title: meta.title ?? '',
      children: it.children?.length ? flatMenu(it.children) : undefined,
    }
  })
}

const { data, loading } = useProRequest(async () => {
  const res = await MenuApi.list()
  return flatMenu(res.data)
})
</script>

<template>
  <pro-input
    :title="$t('pages.system.role.roleName')"
    path="name"
    :tooltip="$t('pages.system.role.roleNameTooltip')"
    required
  />
  <pro-input
    :title="$t('pages.system.role.roleCode')"
    path="code"
    :tooltip="$t('pages.system.role.roleCodeTooltip')"
    required
  />
  <pro-radio-group
    :title="$t('common.often.status')"
    path="status"
    required
    :field-props="{
      options: translateOptions(statusOptions),
    }"
  />
  <pro-tree-select
    title="权限"
    path="permission"
    required
    :field-props="{
      loading,
      options: data,
      keyField: 'id',
      labelField: 'title',
      checkable: true,
      cascade: true,
      multiple: true,
      maxTagCount: 3,
    }"
  />

  <pro-textarea
    :title="$t('common.often.remark')"
    path="remark"
    :field-props="{
      autosize: {
        minRows: 3,
        maxRows: 5,
      },
    }"
  />
</template>
