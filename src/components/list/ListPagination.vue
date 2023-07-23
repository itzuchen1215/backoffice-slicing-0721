<script setup lang="ts">
import IconChevron from '@/components/icons/IconChevron.vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import { watch, ref, computed } from 'vue'

const props = defineProps({
  initPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['pageChange'])

const selectedPage = ref(1)
const selectOptionCount = computed<number>(() => {
  if (props.total > 0) {
    return Math.ceil(props.total / props.pageSize)
  }
  return 1
})

watch(selectedPage, (page: number) => {
  emit('pageChange', page)
})

function handlePageChange(step: number) {
  let currentPage = selectedPage.value
  currentPage += step

  if (currentPage > 0 && currentPage <= selectOptionCount.value) {
    selectedPage.value = currentPage
  }
}
</script>

<template>
  <div v-if="total > 0" class="flex flex-shrink-0 items-center gap-6">
    <div class="text-base font-semibold text-[#737791]">Total {{ total }} |</div>
    <div class="flex items-center gap-6">
      <IconChevron class="rotate-180 cursor-pointer text-[10px]" @click="handlePageChange(-1)" />
      <div class="relative flex h-8 cursor-pointer items-center rounded-md bg-white">
        <select v-model="selectedPage" class="cursor-pointer pl-[9px] pr-4">
          <template v-for="page in selectOptionCount" :key="page">
            <option :value="page" selected>{{ page }}</option>
          </template>
        </select>
        <IconChevronDown
          class="absolute right-[6px] top-1/2 w-2 translate-y-[-50%] text-[#151D48]"
        />
      </div>
      <IconChevron class="cursor-pointer text-[10px]" @click="handlePageChange(1)" />
    </div>
  </div>
</template>
