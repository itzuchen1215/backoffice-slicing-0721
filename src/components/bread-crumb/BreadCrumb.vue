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
  // router push to path
  // router.push(item.path)
}
</script>

<template>
  <ul class="flex items-center gap-[10px]" v-if="items">
    <template v-for="(item, index) in items" :key="item.name">
      <li class="leading-[30px] text-xs cursor-pointer" :class="{'current': item.isCurrent}" @click="handleClickItem(item)">
        {{ item.name }}
      </li>
      <li v-if="index + 1 < items.length">
        <IconChevron class="text-[#737791] h-[10px]" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
.current {
  @apply text-sm font-medium text-[#121212] cursor-default tracking-[1.4px];
}
</style>
