<script setup lang="ts">
import { defineAsyncComponent, type PropType } from 'vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import { useTreeMenu } from './useTreeMenu'
import type { ITreeMenu } from './type'

const props = defineProps({
  treeNode: Object as PropType<ITreeMenu>,
  isActive: Boolean,
  level: Number
})

const { getIcon } = useTreeMenu()

function hasChildren(item: ITreeMenu[] | undefined) {
  return item && item.length > 0
}
</script>

<template>
  <div
    v-if="treeNode"
    class="flex cursor-pointer items-start xl:hover:bg-[#D8DDEB]"
    :class="[{ 'bg-[#D8DDEB]': isActive }, `level${level}-block`]"
  >
    <div class="flex items-start gap-3">
      <slot name="icon"></slot>
      <template v-if="treeNode.icon">
        <Suspense>
          <component class="mt-[2px] flex-shrink-0 text-xl" :is="getIcon(treeNode.icon)" />
        </Suspense>
      </template>
      <span :class="`level${level}-label`">{{ treeNode.label }}</span>
    </div>
    <IconChevronDown
      class="flex-shrink-0 text-xs text-[#151D48]"
      :class="`level${level}-chevron`"
      v-if="hasChildren(treeNode.children)"
    />
  </div>
</template>

<style scoped>
.level0-block {
  @apply justify-between py-4 pl-6 pr-9 xl:pl-7;
}
.level0-label {
  @apply text-base font-semibold text-[#11263C];
}

.level0-chevron {
  @apply mt-2;
}

.level1-block {
  @apply gap-5 py-3 pl-14;
}
.level1-label {
  @apply text-sm font-semibold text-[#11263C];
}

.level1-chevron {
  @apply mt-1;
}

.level2-block {
  @apply py-3 pl-[88px];
}

.level2-label {
  @apply text-sm font-medium text-[#565867];
}
</style>
