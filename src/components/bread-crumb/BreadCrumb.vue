<script setup lang="ts">
import IconChevron from '@/components/icons/IconChevron.vue'
import type { IBreadCrumbItems } from './types'
import type { PropType } from 'vue'

defineProps({
  items: Array as PropType<IBreadCrumbItems[]>
})

function handleClickItem(item: IBreadCrumbItems) {
  if (item.isCurrent) {
    return
  }
  // router.push(item.path)
}
</script>

<template>
  <ul class="flex items-center gap-[10px] xl:gap-4" v-if="items">
    <template v-for="(item, index) in items" :key="item.name">
      <li
        class="cursor-pointer text-xs leading-[30px] text-[#737791] xl:text-[14px]"
        :class="{ current: item.isCurrent }"
        @click="handleClickItem(item)"
      >
        {{ item.name }}
      </li>
      <li v-if="index + 1 < items.length">
        <IconChevron class="h-[10px] text-[#737791]" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
.current {
  @apply cursor-default text-sm font-medium tracking-[1.4px] text-[#121212];
}
</style>
